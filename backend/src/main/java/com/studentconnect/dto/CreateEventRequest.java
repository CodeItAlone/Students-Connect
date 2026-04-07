package com.studentconnect.dto;

import com.studentconnect.model.enums.EventMode;
import com.studentconnect.model.enums.EventType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CreateEventRequest {
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @NotNull
    private EventType type;
    @NotNull
    private EventMode mode;
    private String location;
    @NotNull
    private LocalDateTime startDate;
    @NotNull
    private LocalDateTime endDate;
    private LocalDateTime registrationDeadline;
    private Integer maxParticipants;
    @NotNull
    private Long clubId;
    private String bannerUrl;
    private List<String> tags;
}
