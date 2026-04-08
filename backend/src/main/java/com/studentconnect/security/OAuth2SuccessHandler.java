package com.studentconnect.security;

import com.studentconnect.model.User;
import com.studentconnect.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private static final Logger logger = LoggerFactory.getLogger(OAuth2SuccessHandler.class);

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {

        try {
            System.out.println("OAuth login started");
            
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

            String email = oAuth2User.getAttribute("email");
            String name = oAuth2User.getAttribute("name");

            System.out.println("User email: " + email);

            if (email == null) {
                logger.error("OAuth2 login failed: no email returned from provider");
                response.sendRedirect(frontendUrl + "/login?error=" +
                        URLEncoder.encode("Google did not provide an email address", StandardCharsets.UTF_8));
                return;
            }

            User user = userRepository.findByEmail(email).orElse(null);

            if (user == null) {
                // Auto-register new Google user
                String username = email.substring(0, email.indexOf("@"));

                // Handle duplicate username
                if (userRepository.existsByUsername(username)) {
                    username = username + "_" + UUID.randomUUID().toString().substring(0, 6);
                }

                user = new User();
                user.setEmail(email);
                user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
                user.setFullName(name != null ? name : "Google User");
                user.setUsername(username);
                user.setRole("STUDENT");
                user.setEnabled(true);
                user.setVerified(true);
                userRepository.save(user);
                
                logger.info("Auto-registered Google user: {}", email);
            }

            // Prevent null values
            boolean updated = false;
            
            if (user.getRole() == null || user.getRole().isEmpty()) {
                user.setRole("STUDENT");
                updated = true;
            }
            
            if (user.getVerified() == null) {
                user.setVerified(true);
                updated = true;
            }
            
            if (!user.isEnabled()) {
                user.setEnabled(true);
                user.setVerified(true);
                user.setVerificationToken(null);
                updated = true;
                logger.info("Verified existing user via Google OAuth: {}", email);
            }

            if (updated) {
                userRepository.save(user);
            }

            String token = jwtTokenProvider.generateToken(user.getEmail());

            // Redirect to frontend with JWT token
            response.sendRedirect(frontendUrl + "/auth/callback?token=" +
                    URLEncoder.encode(token, StandardCharsets.UTF_8));

        } catch (Exception e) {
            e.printStackTrace();
            logger.error("OAuth2 success handler failed", e);
            response.sendRedirect(frontendUrl + "/login?error=" +
                    URLEncoder.encode("Google sign-in failed. Please try again.", StandardCharsets.UTF_8));
        }
    }
}
