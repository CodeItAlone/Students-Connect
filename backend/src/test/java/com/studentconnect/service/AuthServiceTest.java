package com.studentconnect.service;

import com.studentconnect.dto.RegisterRequest;
import com.studentconnect.model.User;
import com.studentconnect.repository.UserRepository;
import com.studentconnect.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private AuthService authService;

    private RegisterRequest registerRequest;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest();
        registerRequest.setEmail("test@example.com");
        registerRequest.setFullName("Test User");
        registerRequest.setUsername("testuser");
        registerRequest.setPassword("password123");
    }

    @Test
    void register_ShouldSaveUser_WhenEmailIsUnique() {
        // Arrange
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(jwtTokenProvider.generateVerificationToken(anyString())).thenReturn("mock-token");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        authService.register(registerRequest);

        // Assert
        verify(userRepository, times(1)).save(any(User.class));
        verify(emailService, times(1)).sendVerificationEmail(eq("test@example.com"), eq("mock-token"));
    }

    @Test
    void register_ShouldThrowException_WhenEmailExists() {
        // Arrange
        when(userRepository.existsByEmail(anyString())).thenReturn(true);

        // Act & Assert
        assertThrows(ResponseStatusException.class, () -> authService.register(registerRequest));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void verifyEmail_ShouldEnableUser_WhenTokenIsValid() {
        // Arrange
        String token = "valid-token";
        String email = "test@example.com";
        User user = User.builder()
                .email(email)
                .isEnabled(false)
                .build();
        
        when(jwtTokenProvider.validateToken(token)).thenReturn(true);
        when(jwtTokenProvider.getEmail(token)).thenReturn(email);
        when(userRepository.findByEmail(email)).thenReturn(java.util.Optional.of(user));

        // Act
        authService.verifyEmail(token);

        // Assert
        assertTrue(user.isEnabled());
        verify(userRepository, times(1)).save(user);
    }
}
