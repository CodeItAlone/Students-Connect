package com.studentconnect.controller;

import com.studentconnect.dto.CreateEventRequest;
import com.studentconnect.dto.EventResponse;
import com.studentconnect.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping
    public ResponseEntity<Page<EventResponse>> getAllEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Long clubId,
            @RequestParam(required = false) String search,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        String email = userDetails != null ? userDetails.getUsername() : null;
        return ResponseEntity.ok(eventService.getAllEvents(page, size, type, clubId, search, email));
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<EventResponse> getEventById(
            @PathVariable Long eventId,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        String email = userDetails != null ? userDetails.getUsername() : null;
        return ResponseEntity.ok(eventService.getEventById(eventId, email));
    }

    @PostMapping
    public ResponseEntity<EventResponse> createEvent(
            @RequestBody CreateEventRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        return ResponseEntity.ok(eventService.createEvent(request, userDetails.getUsername()));
    }

    @PostMapping("/{eventId}/rsvp")
    public ResponseEntity<Map<String, String>> rsvpEvent(
            @PathVariable Long eventId,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        eventService.rsvpEvent(eventId, userDetails.getUsername());
        return ResponseEntity.ok(Map.of("message", "Successfully RSVPed to the event"));
    }

    @DeleteMapping("/{eventId}/rsvp")
    public ResponseEntity<Map<String, String>> cancelRsvp(
            @PathVariable Long eventId,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        eventService.cancelRsvp(eventId, userDetails.getUsername());
        return ResponseEntity.ok(Map.of("message", "Successfully cancelled RSVP"));
    }
}
