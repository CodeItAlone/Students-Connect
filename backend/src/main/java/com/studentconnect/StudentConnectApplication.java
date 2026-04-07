package com.studentconnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class StudentConnectApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentConnectApplication.class, args);
    }
}
