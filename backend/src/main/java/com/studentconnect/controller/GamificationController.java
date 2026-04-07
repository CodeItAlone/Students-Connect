package com.studentconnect.controller;

import com.studentconnect.dto.BadgeResponse;
import com.studentconnect.dto.LeaderboardEntry;
import com.studentconnect.service.GamificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/gamification")
@RequiredArgsConstructor
public class GamificationController {

    private final GamificationService gamificationService;

    @GetMapping("/leaderboard")
    public ResponseEntity<List<LeaderboardEntry>> getLeaderboard(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        return ResponseEntity.ok(gamificationService.getGlobalLeaderboard(page, size));
    }

    @GetMapping("/badges")
    public ResponseEntity<List<BadgeResponse>> getAllBadges() {
        return ResponseEntity.ok(gamificationService.getAllBadges());
    }

    @GetMapping("/my-badges")
    public ResponseEntity<List<BadgeResponse>> getMyBadges(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(gamificationService.getMyBadges(userDetails.getUsername()));
    }

    @PostMapping("/award-badge")
    public ResponseEntity<Map<String, String>> awardBadge(
            @RequestParam Long studentId,
            @RequestParam Long badgeId,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        gamificationService.awardBadge(studentId, badgeId, userDetails.getUsername());
        return ResponseEntity.ok(Map.of("message", "Badge awarded successfully"));
    }
}
