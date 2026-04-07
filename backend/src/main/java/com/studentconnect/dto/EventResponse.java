package com.studentconnect.dto;

import com.studentconnect.model.enums.EventMode;
import com.studentconnect.model.enums.EventType;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class EventResponse {
    private Long id;
    private String title;
    private String description;
    private String bannerUrl;
    private EventType type;
    private EventMode mode;
    private String location;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime registrationDeadline;
    private Integer maxParticipants;
    private int currentParticipants;
    private Long clubId;
    private String clubName;
    private List<String> tags;
    private boolean isRsvped;
}
