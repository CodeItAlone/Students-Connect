package com.studentconnect.config;

import com.studentconnect.model.Club;
import com.studentconnect.model.ClubMember;
import com.studentconnect.model.User;
import com.studentconnect.model.enums.ClubMemberRole;
import com.studentconnect.repository.ClubMemberRepository;
import com.studentconnect.repository.ClubRepository;
import com.studentconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class ClubDataLoader implements CommandLineRunner {

    private final ClubRepository clubRepository;
    private final ClubMemberRepository clubMemberRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final org.springframework.transaction.support.TransactionTemplate transactionTemplate;

    @org.springframework.beans.factory.annotation.Value("${app.frontend.url:https://students-connect.vercel.app}")
    private String frontendUrl;

    @Override
    public void run(String... args) throws Exception {
        log.info("Application context loaded. Backend is ready to serve. Seeding will commence in background...");
        
        // Run seeding in a separate thread to avoid blocking Render's port binding/startup health check
        new Thread(() -> {
            try {
                // Use TransactionTemplate to ensure the background work is wrapped in a transaction
                transactionTemplate.execute(status -> {
                    performSeeding();
                    return null;
                });
            } catch (Exception e) {
                log.error("Background seeding failed: {}", e.getMessage(), e);
            }
        }).start();
    }

    private void performSeeding() {
        try {
            if (clubRepository.count() > 0) {
                log.info("Clubs already exist in database (Count: {}), skipping background seeding.", clubRepository.count());
                return;
            }

            log.info("Background thread: Starting production club seeding...");

            // Null safety for frontendUrl
            String safeFrontendUrl = (frontendUrl != null) ? frontendUrl : "https://students-connect.vercel.app";
            String baseUrl = safeFrontendUrl.endsWith("/") ? safeFrontendUrl.substring(0, safeFrontendUrl.length() - 1) : safeFrontendUrl;

            // 1. Ensure we have a system leader
            User admin = userRepository.findByEmail("admin@studentconnect.com")
                    .orElseGet(() -> {
                        String adminUsername = "system_admin";
                        if (userRepository.existsByUsername(adminUsername)) {
                            adminUsername = "admin_main";
                        }
                        
                        User newUser = User.builder()
                                .email("admin@studentconnect.com")
                                .password(passwordEncoder.encode("Admin@123"))
                                .username(adminUsername)
                                .fullName("System Administrator")
                                .role("ADMIN")
                                .verified(true)
                                .isEnabled(true)
                                .build();
                        return userRepository.save(newUser);
                    });

            // 2. Create Mock Users (20 students)
            List<User> mockUsers = new ArrayList<>();
            for (int i = 1; i <= 20; i++) {
                final int index = i;
                String email = "student" + index + "@example.com";
                String username = "student_" + index;
                
                User student = userRepository.findByEmail(email).orElse(null);
                
                if (student == null) {
                    if (!userRepository.existsByUsername(username)) {
                        User s = User.builder()
                                .email(email)
                                .password(passwordEncoder.encode("Password@123"))
                                .username(username)
                                .fullName("Verified Student " + index)
                                .role("STUDENT")
                                .verified(true)
                                .isEnabled(true)
                                .build();
                        student = userRepository.save(s);
                    } else {
                        log.warn("Username {} already exists, skipping for {}", username, email);
                        continue;
                    }
                }
                mockUsers.add(student);
            }

            // 3. Seed Clubs
            if (mockUsers.size() >= 10) {
                log.info("Mock users verified. Creating club records...");
                
                seedClub("CodeCraft Society", "codecraft-society", "Technology",
                        "Build real projects, crack hackathons, and master coding together.",
                        "A high-energy coding community for developers, builders, and problem solvers.",
                        Arrays.asList("Web Dev", "DSA", "Open Source"),
                        baseUrl + "/banners/laptop.jpg",
                        admin, mockUsers.subList(0, Math.min(mockUsers.size(), 15)));

                seedClub("AI Innovators Circle", "ai-innovators-circle", "Artificial Intelligence",
                        "Explore AI tools, machine learning, automation, and future careers.",
                        "A future-focused club for students learning AI tools and ML.",
                        Arrays.asList("AI", "ML", "Automation"),
                        baseUrl + "/banners/ai.jpg",
                        admin, mockUsers.subList(0, Math.min(mockUsers.size(), 12)));

                seedClub("Career Launch Network", "career-launch-network", "Career Development",
                        "Accelerate internships, placements, resumes, and interview success.",
                        "Designed for ambitious students who want internships and jobs.",
                        Arrays.asList("Placements", "Resume", "Interview"),
                        baseUrl + "/banners/study.jpg",
                        admin, mockUsers.subList(0, Math.min(mockUsers.size(), 18)));

                seedClub("Startup Founders Hub", "startup-founders-hub", "Entrepreneurship",
                        "Turn ideas into startups, products, and winning pitches.",
                        "A builder community for entrepreneurs and creators.",
                        Arrays.asList("Startup", "Founder", "Pitching"),
                        baseUrl + "/banners/meeting.jpg",
                        admin, mockUsers.subList(0, Math.min(mockUsers.size(), 10)));

                seedClub("Social Impact Alliance", "social-impact-alliance", "Leadership",
                        "Lead change through volunteering, sustainability, and social projects.",
                        "A community of changemakers driving awareness campaigns.",
                        Arrays.asList("Leadership", "NGO", "Sustainability"),
                        baseUrl + "/banners/vr.jpg",
                        admin, mockUsers.subList(0, Math.min(mockUsers.size(), 20)));
            }

            log.info("Background Seeding Completed: 5 clubs successfully verified/created.");
        } catch (Exception e) {
            log.error("ERROR DURING BACKGROUND SEEDING: {}. System remains online.", e.getMessage(), e);
        }
    }

    private void seedClub(String name, String slug, String category, String shortDesc, String fullDesc, 
                          List<String> tags, String bannerUrl, User leader, List<User> members) {
        Club club = Club.builder()
                .name(name)
                .slug(slug)
                .category(category)
                .shortDescription(shortDesc)
                .fullDescription(fullDesc)
                .tags(tags)
                .bannerUrl(bannerUrl)
                .logoUrl(null)
                .websiteUrl("https://example.com/" + slug)
                .isOpen(true)
                .isVerified(true)
                .leader(leader)
                .college("Student Connect University")
                .createdAt(LocalDateTime.now())
                .build();
        
        Club savedClub = clubRepository.save(club);

        // Add leader as a member
        clubMemberRepository.save(ClubMember.builder()
                .club(savedClub)
                .user(leader)
                .role(ClubMemberRole.LEADER)
                .build());

        // Add mock members
        for (User member : members) {
            if (!member.getId().equals(leader.getId())) {
                clubMemberRepository.save(ClubMember.builder()
                        .club(savedClub)
                        .user(member)
                        .role(ClubMemberRole.MEMBER)
                        .build());
            }
        }
    }
}
