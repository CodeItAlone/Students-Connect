package com.studentconnect.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class MentorResponse {
    private Long id;
    private String fullName;
    private String username;
    private String avatarUrl;
    private List<String> expertise;
    private String bio;
    private float rating;
    private int totalSessions;
}
