package com.studentconnect.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class ClubResponse {
    private Long id;
    private String name;
    private String slug;
    private String shortDescription;
    private String fullDescription;
    private String websiteUrl;
    private boolean isOpen;
    private String category;
    private String logoUrl;
    private String bannerUrl;
    private String college;
    private boolean verified;
    private List<String> tags;
    private long memberCount;
    private String leaderName;
    private boolean isJoined;
}
