package com.studentconnect.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookSessionRequest {
    @NotNull
    private Long slotId;
    @NotBlank
    private String topic;
}
