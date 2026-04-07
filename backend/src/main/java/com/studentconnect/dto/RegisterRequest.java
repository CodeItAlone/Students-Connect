package com.studentconnect.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String fullName;
    private String username;
    private String college;
    private String department;
    private Integer year;
}
