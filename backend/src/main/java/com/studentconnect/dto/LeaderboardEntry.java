package com.studentconnect.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LeaderboardEntry {
    private int rank;
    private Long userId;
    private String fullName;
    private String avatarUrl;
    private int points;
    private int badges;
}
