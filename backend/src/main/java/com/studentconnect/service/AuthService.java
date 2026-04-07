package com.studentconnect.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.studentconnect.dto.*;
import com.studentconnect.model.User;
import com.studentconnect.repository.UserRepository;
import com.studentconnect.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final EmailService emailService;
    
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    private final Map<String, Long> lastSentTimeMap = new ConcurrentHashMap<>();

    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Email already exists");
        }

        if (request.getUsername() != null && userRepository.existsByUsername(request.getUsername())) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Username already taken");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName() != null ? request.getFullName() : "Unknown")
                .username(request.getUsername() != null ? request.getUsername() : request.getEmail())
                .college(request.getCollege())
                .department(request.getDepartment())
                .year(request.getYear())
                .role("STUDENT")
                .isEnabled(false)
                .verificationToken(jwtTokenProvider.generateVerificationToken(request.getEmail()))
                .build();

        userRepository.save(user);
        
        // Send verification email (failure-safe: registration still succeeds)
        try {
            emailService.sendVerificationEmail(request.getEmail(), user.getVerificationToken());
            lastSentTimeMap.put(request.getEmail(), System.currentTimeMillis());
        } catch (Exception e) {
            logger.warn("Failed to send verification email to {}, user can request resend later", request.getEmail(), e);
        }
    }

    public String login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Invalid credentials");
        }
        
        if (!user.isEnabled()) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.FORBIDDEN, "Please verify your email first");
        }

        return jwtTokenProvider.generateToken(user.getEmail());
    }
    
    public String googleLogin(GoogleLoginRequest request) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(request.getIdToken());
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                String name = (String) payload.get("name");
                
                User user = userRepository.findByEmail(email).orElse(null);
                if (user == null) {
                    // Auto-register the Google user
                    user = User.builder()
                            .email(email)
                            .password(passwordEncoder.encode(java.util.UUID.randomUUID().toString()))
                            .fullName(name != null ? name : "Google User")
                            .username(email.substring(0, email.indexOf("@")))
                            .role("STUDENT")
                            .isEnabled(true)
                            .build();
                    userRepository.save(user);
                } else if (!user.isEnabled()) {
                    // If they registered manually but verify through Google now
                    user.setEnabled(true);
                    userRepository.save(user);
                }
                
                return jwtTokenProvider.generateToken(user.getEmail());
            } else {
                throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Invalid Google ID token");
            }
        } catch (Exception e) {
            logger.error("Failed to verify Google Token", e);
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Failed to verify Google Token");
        }
    }
    
    public void verifyEmail(String token) {
        if (!jwtTokenProvider.validateToken(token)) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Invalid or expired token");
        }
        
        String email = jwtTokenProvider.getEmail(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "User not found"));
                
        if (user.isEnabled()) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Email already verified");
        }
        
        user.setEnabled(true);
        user.setVerificationToken(null); // Clear token after verification
        userRepository.save(user);
    }
    
    public void resendVerification(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "User not found"));
                
        if (user.isEnabled()) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "User is already verified");
        }
        
        long currentTime = System.currentTimeMillis();
        long lastSent = lastSentTimeMap.getOrDefault(email, 0L);
        
        // 60 seconds rate limit
        if (currentTime - lastSent < 60000) {
            long remaining = (60000 - (currentTime - lastSent)) / 1000;
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.TOO_MANY_REQUESTS, "Please wait " + remaining + " seconds before requesting another email");
        }
        
        String token = jwtTokenProvider.generateVerificationToken(email);
        user.setVerificationToken(token);
        userRepository.save(user);
        emailService.sendVerificationEmail(email, token);
        lastSentTimeMap.put(email, currentTime);
    }
}
