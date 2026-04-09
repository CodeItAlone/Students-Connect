package com.studentconnect.controller;

import com.studentconnect.dto.*;
import com.studentconnect.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public org.springframework.http.ResponseEntity<java.util.Map<String, String>> register(@RequestBody RegisterRequest request) {
        org.slf4j.LoggerFactory.getLogger(AuthController.class).info("Received registration request for email: {}", request.getEmail());
        try {
            authService.register(request);
            return org.springframework.http.ResponseEntity.ok(java.util.Map.of("message", "User registered successfully. Please check your email to verify your account."));
        } catch (org.springframework.web.server.ResponseStatusException e) {
            org.slf4j.LoggerFactory.getLogger(AuthController.class).warn("Registration failed (expected): {} - {}", request.getEmail(), e.getReason());
            throw e;
        } catch (Exception e) {
            org.slf4j.LoggerFactory.getLogger(AuthController.class).error("Registration CRITICAL FAILURE for email: {}", request.getEmail(), e);
            return org.springframework.http.ResponseEntity
                    .status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(java.util.Map.of("message", "Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/google")
    public String googleLogin(@RequestBody @jakarta.validation.Valid GoogleLoginRequest request) {
        return authService.googleLogin(request);
    }

    @PostMapping("/verify")
    public org.springframework.http.ResponseEntity<java.util.Map<String, String>> verifyEmail(@RequestParam String token) {
        authService.verifyEmail(token);
        return org.springframework.http.ResponseEntity.ok(java.util.Map.of("message", "Email verified successfully"));
    }

    @PostMapping("/resend-verification")
    public org.springframework.http.ResponseEntity<java.util.Map<String, String>> resendVerification(@RequestBody ResendVerificationRequest request) {
        authService.resendVerification(request.getEmail());
        return org.springframework.http.ResponseEntity.ok(java.util.Map.of("message", "Verification email sent"));
    }
}
