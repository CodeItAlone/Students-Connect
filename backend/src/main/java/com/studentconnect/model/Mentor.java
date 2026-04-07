package com.studentconnect.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "mentors")
public class Mentor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @ElementCollection
    @CollectionTable(name = "mentor_expertise", joinColumns = @JoinColumn(name = "mentor_id"))
    @Column(name = "skill")
    @Builder.Default
    private List<String> expertise = new ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String availability;

    @Column(nullable = false)
    @Builder.Default
    private float rating = 0.0f;

    @Column(name = "total_sessions", nullable = false)
    @Builder.Default
    private int totalSessions = 0;

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;
}
