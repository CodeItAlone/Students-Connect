package com.studentconnect.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String fullName;

    private String avatarUrl;
    private String bio;
    private String college;
    private String department;
    
    private Integer year;
    
    @Column(nullable = false)
    @Builder.Default
    private String role = "STUDENT";

    @Column(nullable = false)
    @Builder.Default
    private int points = 0;

    @Column(name = "is_enabled", nullable = false)
    @Builder.Default
    private boolean isEnabled = false;

    @Column(name = "verified", nullable = false)
    @Builder.Default
    private Boolean verified = false;

    private String verificationToken;

    @Column(name = "created_at", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (updatedAt == null) updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
