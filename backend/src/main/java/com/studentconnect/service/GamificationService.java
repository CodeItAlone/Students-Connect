package com.studentconnect.service;

import com.studentconnect.dto.BadgeResponse;
import com.studentconnect.dto.LeaderboardEntry;
import com.studentconnect.model.Badge;
import com.studentconnect.model.User;
import com.studentconnect.model.UserBadge;
import com.studentconnect.repository.BadgeRepository;
import com.studentconnect.repository.UserBadgeRepository;
import com.studentconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GamificationService {

    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final UserRepository userRepository;

    @Transactional
    public void addPoints(String email, int points) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        user.setPoints(user.getPoints() + points);
        userRepository.save(user);
    }

    @Transactional
    public void awardBadge(Long studentId, Long badgeId, String adminEmail) {
        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found"));

        if (!"ADMIN".equals(admin.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only admins can award badges");
        }

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
        
        Badge badge = badgeRepository.findById(badgeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Badge not found"));

        // Check if student already has this badge
        List<UserBadge> existing = userBadgeRepository.findByUser(student);
        if (existing.stream().anyMatch(ub -> ub.getBadge().getId().equals(badgeId))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Student already has this badge");
        }

        UserBadge userBadge = UserBadge.builder()
                .user(student)
                .badge(badge)
                .earnedAt(LocalDateTime.now())
                .build();

        userBadgeRepository.save(userBadge);
    }

    public List<LeaderboardEntry> getGlobalLeaderboard(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> usersPage = userRepository.findAllByOrderByPointsDesc(pageable);
        
        AtomicInteger rank = new AtomicInteger(page * size + 1);
        return usersPage.getContent().stream()
                .map(user -> LeaderboardEntry.builder()
                        .rank(rank.getAndIncrement())
                        .userId(user.getId())
                        .fullName(user.getFullName())
                        .avatarUrl(user.getAvatarUrl())
                        .points(user.getPoints())
                        .badges(userBadgeRepository.findByUser(user).size())
                        .build())
                .collect(Collectors.toList());
    }

    public List<BadgeResponse> getAllBadges() {
        return badgeRepository.findAll().stream()
                .map(badge -> BadgeResponse.builder()
                        .id(badge.getId())
                        .name(badge.getName())
                        .description(badge.getDescription())
                        .iconUrl(badge.getIconUrl())
                        .category(badge.getCategory())
                        .build())
                .collect(Collectors.toList());
    }

    public List<BadgeResponse> getMyBadges(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        return userBadgeRepository.findByUser(user).stream()
                .map(ub -> BadgeResponse.builder()
                        .id(ub.getBadge().getId())
                        .name(ub.getBadge().getName())
                        .description(ub.getBadge().getDescription())
                        .iconUrl(ub.getBadge().getIconUrl())
                        .category(ub.getBadge().getCategory())
                        .earnedAt(ub.getEarnedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
