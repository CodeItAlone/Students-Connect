package com.studentconnect.controller;

import com.studentconnect.dto.DashboardStatsResponse;
import com.studentconnect.service.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class StatsController {

    private final StatsService statsService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        DashboardStatsResponse stats = statsService.getDashboardStats();
        return ResponseEntity.ok()
                .cacheControl(CacheControl.noStore())
                .body(stats);
    }
}
