package com.studentconnect.controller;

import com.studentconnect.dto.BookSessionRequest;
import com.studentconnect.dto.MentorResponse;
import com.studentconnect.dto.MentorSlotResponse;
import com.studentconnect.service.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mentors")
@RequiredArgsConstructor
public class MentorsController {

    private final MentorService mentorService;

    @GetMapping
    public ResponseEntity<List<MentorResponse>> getAllMentors(
            @RequestParam(required = false) String expertise) {
        return ResponseEntity.ok(mentorService.getAllMentors(expertise));
    }

    @GetMapping("/{mentorId}")
    public ResponseEntity<MentorResponse> getMentorById(@PathVariable Long mentorId) {
        return ResponseEntity.ok(mentorService.getMentorById(mentorId));
    }

    @GetMapping("/{mentorId}/slots")
    public ResponseEntity<List<MentorSlotResponse>> getMentorSlots(@PathVariable Long mentorId) {
        return ResponseEntity.ok(mentorService.getAvailableSlots(mentorId));
    }

    @PostMapping("/{mentorId}/book")
    public ResponseEntity<Map<String, String>> bookSession(
            @PathVariable Long mentorId,
            @RequestBody BookSessionRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        mentorService.bookSession(mentorId, request, userDetails.getUsername());
        return ResponseEntity.ok(Map.of("message", "Session booked successfully, awaiting mentor confirmation"));
    }

    // Mentor-only: Adding slots
    @PostMapping("/slots")
    public ResponseEntity<MentorSlotResponse> addSlot(
            @RequestBody MentorSlotResponse slotDto,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        return ResponseEntity.ok(mentorService.addSlot(slotDto, userDetails.getUsername()));
    }
}
