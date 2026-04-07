package com.studentconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    @PostMapping("/suggest")
    public ResponseEntity<Map<String, Object>> getSuggestions(@RequestBody Map<String, String> request) {
        // TODO: Implement with AiService (Anthropic Claude API proxy)
        return ResponseEntity.ok(Map.of(
                "message", "AI suggestions endpoint - awaiting API integration",
                "query", request.getOrDefault("query", "")));
    }

    @PostMapping("/recommend")
    public ResponseEntity<Map<String, Object>> getRecommendations(@RequestBody Map<String, String> request) {
        // TODO: Implement personalized recommendations
        return ResponseEntity.ok(Map.of("message", "AI recommendations endpoint"));
    }
}
