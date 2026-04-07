package com.studentconnect.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class BadgeResponse {
    private Long id;
    private String name;
    private String description;
    private String iconUrl;
    private String category;
    private LocalDateTime earnedAt;
}
