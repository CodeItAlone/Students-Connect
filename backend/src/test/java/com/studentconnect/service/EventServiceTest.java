package com.studentconnect.service;

import com.studentconnect.model.Club;
import com.studentconnect.model.Event;
import com.studentconnect.model.User;
import com.studentconnect.model.enums.EventType;
import com.studentconnect.repository.EventRepository;
import com.studentconnect.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private GamificationService gamificationService;

    @InjectMocks
    private EventService eventService;

    @Test
    void rsvpEvent_ShouldAwardPoints_WhenSuccessful() {
        // Arrange
        String email = "student@example.com";
        Long eventId = 1L;
        User user = User.builder().id(2L).email(email).build();
        Event event = Event.builder()
                .id(eventId)
                .participants(new ArrayList<>())
                .registrationDeadline(LocalDateTime.now().plusDays(1))
                .build();

        when(eventRepository.findById(eventId)).thenReturn(Optional.of(event));
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Act
        eventService.rsvpEvent(eventId, email);

        // Assert
        verify(eventRepository, times(1)).save(event);
        verify(gamificationService, times(1)).addPoints(email, 20);
    }

    @Test
    void rsvpEvent_ShouldThrowException_WhenDeadlinePassed() {
        // Arrange
        String email = "student@example.com";
        Long eventId = 1L;
        User user = User.builder().id(2L).email(email).build();
        Event event = Event.builder()
                .id(eventId)
                .participants(new ArrayList<>())
                .registrationDeadline(LocalDateTime.now().minusDays(1))
                .build();

        when(eventRepository.findById(eventId)).thenReturn(Optional.of(event));
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Act & Assert
        assertThrows(ResponseStatusException.class, () -> eventService.rsvpEvent(eventId, email));
    }
}
