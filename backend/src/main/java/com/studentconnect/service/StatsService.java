package com.studentconnect.service;

import com.studentconnect.dto.DashboardStatsResponse;
import com.studentconnect.repository.ClubRepository;
import com.studentconnect.repository.EventRepository;
import com.studentconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final ClubRepository clubRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public DashboardStatsResponse getDashboardStats() {
        // Club Logic: Using isVerified as a temporary proxy for "Active"
        long activeClubs = clubRepository.countByIsVerified(true);
        
        // Event Logic: Count events starting after now
        long upcomingEvents = eventRepository.countByStartDateAfter(LocalDateTime.now());
        
        // User Logic: Count total registered users
        long studentsConnected = userRepository.count();

        return DashboardStatsResponse.builder()
                .activeClubs(activeClubs)
                .upcomingEvents(upcomingEvents)
                .studentsConnected(studentsConnected)
                .build();
    }
}
