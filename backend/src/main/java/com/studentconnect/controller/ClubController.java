package com.studentconnect.controller;

import com.studentconnect.dto.ClubResponse;
import com.studentconnect.dto.CreateClubRequest;
import com.studentconnect.service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/clubs")
@RequiredArgsConstructor
public class ClubController {

    private final ClubService clubService;

    @GetMapping
    public ResponseEntity<Page<ClubResponse>> getAllClubs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        String email = userDetails != null ? userDetails.getUsername() : null;
        return ResponseEntity.ok(clubService.getAllClubs(page, size, search, category, email));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ClubResponse> getClubBySlug(
            @PathVariable String slug,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        String email = userDetails != null ? userDetails.getUsername() : null;
        return ResponseEntity.ok(clubService.getClubBySlug(slug, email));
    }

    @PostMapping
    public ResponseEntity<ClubResponse> createClub(
            @RequestBody CreateClubRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        return ResponseEntity.ok(clubService.createClub(request, userDetails.getUsername()));
    }

    @PostMapping("/{clubId}/join")
    public ResponseEntity<Map<String, String>> joinClub(
            @PathVariable Long clubId,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        clubService.joinClub(clubId, userDetails.getUsername());
        return ResponseEntity.ok(Map.of("message", "Successfully joined the club"));
    }

    @PostMapping("/{clubId}/leave")
    public ResponseEntity<Map<String, String>> leaveClub(
            @PathVariable Long clubId,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        clubService.leaveClub(clubId, userDetails.getUsername());
        return ResponseEntity.ok(Map.of("message", "Successfully left the club"));
    }

    @GetMapping("/{clubId}/members")
    public ResponseEntity<List<Map<String, String>>> getMembers(@PathVariable Long clubId) {
        List<Map<String, String>> members = clubService.getMembers(clubId).stream()
                .map(user -> Map.of(
                        "id", user.getId().toString(),
                        "fullName", user.getFullName(),
                        "username", user.getUsername(),
                        "avatarUrl", user.getAvatarUrl() != null ? user.getAvatarUrl() : ""
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(members);
    }
}
