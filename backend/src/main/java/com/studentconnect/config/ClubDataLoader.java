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
public class ClubDataLoader implements CommandLineRunner {

    private final ClubRepository clubRepository;
    private final ClubMemberRepository clubMemberRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (clubRepository.count() > 0) {
            log.info("Clubs already exist, skipping seeding.");
            return;
        }

        log.info("Seeding premium clubs for judge demo...");

        // 1. Ensure we have a system leader
        User admin = userRepository.findByEmail("admin@studentconnect.com")
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .email("admin@studentconnect.com")
                            .password(passwordEncoder.encode("Admin@123"))
                            .username("system_admin")
                            .fullName("System Administrator")
                            .role("ADMIN")
                            .verified(true)
                            .isEnabled(true)
                            .build();
                    return userRepository.save(newUser);
                });

        // 2. Create Mock Users for memberships
        List<User> mockUsers = new ArrayList<>();
        for (int i = 1; i <= 20; i++) {
            final int index = i;
            String email = "student" + index + "@example.com";
            User student = userRepository.findByEmail(email).orElseGet(() -> {
                User s = User.builder()
                        .email(email)
                        .password(passwordEncoder.encode("Password@123"))
                        .username("student_" + index)
                        .fullName("Verified Student " + index)
                        .role("STUDENT")
                        .verified(true)
                        .isEnabled(true)
                        .build();
                return userRepository.save(s);
            });
            mockUsers.add(student);
        }

        // 3. Seed Clubs
        seedClub("CodeCraft Society", "codecraft-society", "Technology",
                "Build real projects, crack hackathons, and master coding together.",
                "A high-energy coding community for developers, builders, and problem solvers. Members collaborate on web apps, open source projects, hackathons, and interview prep.",
                Arrays.asList("Web Dev", "DSA", "Open Source", "Hackathons"),
                "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200",
                admin, mockUsers.subList(0, 15));

        seedClub("AI Innovators Circle", "ai-innovators-circle", "Artificial Intelligence",
                "Explore AI tools, machine learning, automation, and future careers.",
                "A future-focused club for students learning AI tools, prompt engineering, automation workflows, and machine learning fundamentals.",
                Arrays.asList("AI", "ML", "Automation", "Prompting"),
                "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200",
                admin, mockUsers.subList(5, 12));

        seedClub("Career Launch Network", "career-launch-network", "Career Development",
                "Accelerate internships, placements, resumes, and interview success.",
                "Designed for ambitious students who want internships, jobs, resume upgrades, networking, and placement preparation.",
                Arrays.asList("Placements", "Resume", "Interview", "Jobs"),
                "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200",
                admin, mockUsers.subList(8, 18));

        seedClub("Startup Founders Hub", "startup-founders-hub", "Entrepreneurship",
                "Turn ideas into startups, products, and winning pitches.",
                "A builder community for entrepreneurs, creators, and students launching startups, MVPs, and pitch decks.",
                Arrays.asList("Startup", "Founder", "Pitching", "Business"),
                "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200",
                admin, mockUsers.subList(0, 8));

        seedClub("Social Impact Alliance", "social-impact-alliance", "Leadership",
                "Lead change through volunteering, sustainability, and social projects.",
                "A community of changemakers driving awareness campaigns, volunteering initiatives, and leadership through action.",
                Arrays.asList("Leadership", "NGO", "Sustainability", "Volunteering"),
                "https://images.unsplash.com/photo-1559027615-cd940b54e7d4?q=80&w=1200",
                admin, mockUsers.subList(12, 20));

        log.info("Clubs seeding completed successfully.");
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
