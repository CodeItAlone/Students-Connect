package com.studentconnect.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.List;

@Data
public class CreateClubRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String shortDescription;
    @NotBlank
    private String fullDescription;
    @NotBlank
    private String category;
    private String websiteUrl;
    private String logoUrl;
    private String bannerUrl;
    private List<String> tags;
}
