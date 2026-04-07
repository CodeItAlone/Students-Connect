package com.studentconnect.service;

import com.studentconnect.dto.ChatMessageResponse;
import com.studentconnect.model.ChatMessage;
import com.studentconnect.model.Club;
import com.studentconnect.model.User;
import com.studentconnect.model.enums.ChatMessageType;
import com.studentconnect.repository.ChatMessageRepository;
import com.studentconnect.repository.ClubRepository;
import com.studentconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final ClubRepository clubRepository;
    private final UserRepository userRepository;

    @Transactional
    public ChatMessageResponse saveMessage(Long clubId, Map<String, String> messageData, String senderEmail) {
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Club not found"));
        
        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sender not found"));

        ChatMessage message = ChatMessage.builder()
                .club(club)
                .sender(sender)
                .content(messageData.getOrDefault("content", ""))
                .type(ChatMessageType.valueOf(messageData.getOrDefault("type", "TEXT").toUpperCase()))
                .build();

        ChatMessage savedMessage = chatMessageRepository.save(message);
        return mapToResponse(savedMessage);
    }

    public Page<ChatMessageResponse> getChatHistory(Long clubId, int page, int size) {
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Club not found"));
        
        Pageable pageable = PageRequest.of(page, size);
        Page<ChatMessage> messages = chatMessageRepository.findByClubOrderByTimestampDesc(club, pageable);
        
        return messages.map(this::mapToResponse);
    }

    private ChatMessageResponse mapToResponse(ChatMessage message) {
        return ChatMessageResponse.builder()
                .id(message.getId())
                .clubId(message.getClub().getId())
                .senderId(message.getSender().getId())
                .senderName(message.getSender().getFullName())
                .senderAvatar(message.getSender().getAvatarUrl())
                .content(message.getContent())
                .type(message.getType())
                .timestamp(message.getTimestamp())
                .build();
    }
}
