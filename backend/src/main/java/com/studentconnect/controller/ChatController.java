package com.studentconnect.controller;

import com.studentconnect.dto.ChatMessageResponse;
import com.studentconnect.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/club/{clubId}/chat")
    @SendTo("/topic/club/{clubId}/chat")
    public ChatMessageResponse sendMessage(
            @DestinationVariable Long clubId, 
            Map<String, String> message,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        return chatService.saveMessage(clubId, message, userDetails.getUsername());
    }

    @GetMapping("/api/clubs/{clubId}/chat/history")
    public ResponseEntity<Page<ChatMessageResponse>> getChatHistory(
            @PathVariable Long clubId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        
        return ResponseEntity.ok(chatService.getChatHistory(clubId, page, size));
    }
}
