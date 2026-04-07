package com.studentconnect.service;

import com.studentconnect.dto.CreateEventRequest;
import com.studentconnect.dto.EventResponse;
import com.studentconnect.model.Club;
import com.studentconnect.model.Event;
import com.studentconnect.model.User;
import com.studentconnect.model.enums.EventType;
import com.studentconnect.repository.ClubRepository;
import com.studentconnect.repository.EventRepository;
import com.studentconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final ClubRepository clubRepository;
    private final UserRepository userRepository;
    private final GamificationService gamificationService;

    public Page<EventResponse> getAllEvents(int page, int size, String type, Long clubId, String search, String currentUserEmail) {
        Pageable pageable = PageRequest.of(page, size);
        EventType eventType = (type == null || type.equalsIgnoreCase("All")) ? null : EventType.valueOf(type.toUpperCase());
        
        Page<Event> events = eventRepository.findAllWithFilters(eventType, clubId, search, pageable);
        
        User currentUser = currentUserEmail != null ? 
            userRepository.findByEmail(currentUserEmail).orElse(null) : null;

        return events.map(event -> mapToResponse(event, currentUser));
    }

    public EventResponse getEventById(Long eventId, String currentUserEmail) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
        
        User currentUser = currentUserEmail != null ? 
            userRepository.findByEmail(currentUserEmail).orElse(null) : null;
            
        return mapToResponse(event, currentUser);
    }

    @Transactional
    public EventResponse createEvent(CreateEventRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        Club club = clubRepository.findById(request.getClubId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Club not found"));

        if (!club.getLeader().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only club leaders can create events");
        }

        Event event = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .type(request.getType())
                .mode(request.getMode())
                .location(request.getLocation())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .registrationDeadline(request.getRegistrationDeadline())
                .maxParticipants(request.getMaxParticipants())
                .bannerUrl(request.getBannerUrl())
                .tags(request.getTags() != null ? request.getTags() : List.of())
                .club(club)
                .build();

        Event savedEvent = eventRepository.save(event);
        return mapToResponse(savedEvent, user);
    }

    @Transactional
    public void rsvpEvent(Long eventId, String userEmail) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (event.getParticipants().stream().anyMatch(p -> p.getId().equals(user.getId()))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Already RSVPed to this event");
        }

        if (event.getMaxParticipants() != null && event.getParticipants().size() >= event.getMaxParticipants()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event is full");
        }

        if (event.getRegistrationDeadline() != null && LocalDateTime.now().isAfter(event.getRegistrationDeadline())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Registration deadline has passed");
        }

        event.getParticipants().add(user);
        eventRepository.save(event);

        // Award points for RSVPing to an event
        gamificationService.addPoints(userEmail, 20);
    }

    @Transactional
    public void cancelRsvp(Long eventId, String userEmail) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        event.getParticipants().removeIf(p -> p.getId().equals(user.getId()));
        eventRepository.save(event);
    }

    private EventResponse mapToResponse(Event event, User currentUser) {
        boolean isRsvped = currentUser != null && 
            event.getParticipants().stream().anyMatch(p -> p.getId().equals(currentUser.getId()));

        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .bannerUrl(event.getBannerUrl())
                .type(event.getType())
                .mode(event.getMode())
                .location(event.getLocation())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .registrationDeadline(event.getRegistrationDeadline())
                .maxParticipants(event.getMaxParticipants())
                .currentParticipants(event.getParticipants().size())
                .clubId(event.getClub().getId())
                .clubName(event.getClub().getName())
                .tags(event.getTags())
                .isRsvped(isRsvped)
                .build();
    }
}
