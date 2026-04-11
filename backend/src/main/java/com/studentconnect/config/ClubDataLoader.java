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
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
@org.springframework.context.annotation.Lazy(false)
public class ClubDataLoader implements CommandLineRunner {

    private final ClubRepository clubRepository;
    private final ClubMemberRepository clubMemberRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @org.springframework.beans.factory.annotation.Value("${app.frontend.url:https://students-connect.vercel.app}")
    private String frontendUrl;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        try {
            if (clubRepository.count() > 0) {
                log.info("Clubs already exist in database (Count: {}), skipping seeding.", clubRepository.count());
                return;
            }

            log.info("Starting production club seeding for Student Connect...");

            // Null safety for frontendUrl
            String safeFrontendUrl = (frontendUrl != null) ? frontendUrl : "https://students-connect.vercel.app";
            String baseUrl = safeFrontendUrl.endsWith("/") ? safeFrontendUrl.substring(0, safeFrontendUrl.length() - 1) : safeFrontendUrl;

            // 1. Ensure we have a system leader
            User admin = userRepository.findByEmail("admin@studentconnect.com")
                    .orElseGet(() -> {
                        // Double check username to avoid duplicate key violation
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

            // 2. Create Mock Users for memberships (20 students)
            List<User> mockUsers = new ArrayList<>();
            for (int i = 1; i <= 20; i++) {
                final int index = i;
                String email = "student" + index + "@example.com";
                String username = "student_" + index;
                
                // Robust check: exists by email OR by username
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
                        // If username exists but email doesn't, skip this mock user to avoid crash
                        log.warn("Username {} already exists, skipping mock user for {}", username, email);
                        continue;
                    }
                }
                mockUsers.add(student);
            }

            // 3. Seed Clubs with specified images
            if (mockUsers.size() >= 10) {
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

            log.info("Production club seeding completed successfully.");
        } catch (Exception e) {
            // CRITICAL: Catch all to prevent app crash on startup
            log.error("FAILED TO SEED CLUBS: {}. Application will continue to start.", e.getMessage());
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
