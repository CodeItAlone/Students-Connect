package com.studentconnect.controller;

import com.studentconnect.dto.ClubResponse;
import com.studentconnect.service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ClubService clubService;

    @GetMapping("/me/clubs")
    public ResponseEntity<List<ClubResponse>> getMyClubs(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.getJoinedClubs(userDetails.getUsername()));
    }

    @GetMapping("/{username}/clubs")
    public ResponseEntity<List<ClubResponse>> getUserClubs(@PathVariable String username) {
        return ResponseEntity.ok(clubService.getJoinedClubsByUsername(username));
    }
}
