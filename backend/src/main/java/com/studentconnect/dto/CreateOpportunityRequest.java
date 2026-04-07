package com.studentconnect.dto;

import com.studentconnect.model.enums.OpportunityType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CreateOpportunityRequest {
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @NotNull
    private OpportunityType type;
    private String company;
    private String location;
    private boolean isRemote;
    private String applicationUrl;
    private LocalDateTime deadline;
    private List<String> tags;
}
