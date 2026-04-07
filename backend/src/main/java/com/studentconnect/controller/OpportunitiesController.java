package com.studentconnect.controller;

import com.studentconnect.dto.CreateOpportunityRequest;
import com.studentconnect.dto.OpportunityResponse;
import com.studentconnect.service.OpportunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/opportunities")
@RequiredArgsConstructor
public class OpportunitiesController {

    private final OpportunityService opportunityService;

    @GetMapping
    public ResponseEntity<Page<OpportunityResponse>> getAllOpportunities(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String search) {
        
        return ResponseEntity.ok(opportunityService.getAllOpportunities(page, size, type, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OpportunityResponse> getOpportunityById(@PathVariable Long id) {
        return ResponseEntity.ok(opportunityService.getOpportunityById(id));
    }

    @PostMapping
    public ResponseEntity<OpportunityResponse> createOpportunity(
            @RequestBody CreateOpportunityRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        return ResponseEntity.ok(opportunityService.createOpportunity(request, userDetails.getUsername()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteOpportunity(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        opportunityService.deleteOpportunity(id, userDetails.getUsername());
        return ResponseEntity.ok(Map.of("message", "Opportunity deleted successfully"));
    }
}
