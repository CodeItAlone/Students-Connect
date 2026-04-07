package com.studentconnect.dto;

import com.studentconnect.model.enums.ChatMessageType;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class ChatMessageResponse {
    private Long id;
    private Long clubId;
    private Long senderId;
    private String senderName;
    private String senderAvatar;
    private String content;
    private ChatMessageType type;
    private LocalDateTime timestamp;
}
