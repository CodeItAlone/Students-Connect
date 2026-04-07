package com.studentconnect.dto;

import com.studentconnect.model.enums.OpportunityType;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OpportunityResponse {
    private Long id;
    private String title;
    private String description;
    private OpportunityType type;
    private String company;
    private String location;
    private boolean isRemote;
    private String applicationUrl;
    private LocalDateTime deadline;
    private List<String> tags;
    private String postedByName;
}
