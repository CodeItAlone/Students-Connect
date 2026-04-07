package com.studentconnect.service;

import com.studentconnect.dto.BookSessionRequest;
import com.studentconnect.dto.MentorResponse;
import com.studentconnect.dto.MentorSlotResponse;
import com.studentconnect.model.*;
import com.studentconnect.model.enums.BookingStatus;
import com.studentconnect.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MentorService {

    private final MentorRepository mentorRepository;
    private final MentorSlotRepository mentorSlotRepository;
    private final MentorBookingRepository mentorBookingRepository;
    private final UserRepository userRepository;

    public List<MentorResponse> getAllMentors(String expertise) {
        List<Mentor> mentors = mentorRepository.findByExpertise(expertise);
        return mentors.stream()
                .map(this::mapToMentorResponse)
                .collect(Collectors.toList());
    }

    public MentorResponse getMentorById(Long mentorId) {
        Mentor mentor = mentorRepository.findById(mentorId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Mentor not found"));
        return mapToMentorResponse(mentor);
    }

    public List<MentorSlotResponse> getAvailableSlots(Long mentorId) {
        Mentor mentor = mentorRepository.findById(mentorId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Mentor not found"));
        
        List<MentorSlot> slots = mentorSlotRepository.findByMentorAndIsBookedFalse(mentor);
        return slots.stream()
                .map(this::mapToSlotResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void bookSession(Long mentorId, BookSessionRequest request, String studentEmail) {
        Mentor mentor = mentorRepository.findById(mentorId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Mentor not found"));
        
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));

        MentorSlot slot = mentorSlotRepository.findById(request.getSlotId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Slot not found"));

        if (slot.isBooked()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Slot is already booked");
        }

        if (!slot.getMentor().getId().equals(mentor.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Slot does not belong to this mentor");
        }

        // Mark slot as booked
        slot.setBooked(true);
        mentorSlotRepository.save(slot);

        // Create booking
        MentorBooking booking = MentorBooking.builder()
                .mentor(mentor)
                .student(student)
                .slot(slot)
                .topic(request.getTopic())
                .status(BookingStatus.PENDING)
                .build();
        
        mentorBookingRepository.save(booking);

        // Update mentor stats
        mentor.setTotalSessions(mentor.getTotalSessions() + 1);
        mentorRepository.save(mentor);
    }

    // Mentor management of slots
    @Transactional
    public MentorSlotResponse addSlot(MentorSlotResponse slotDto, String mentorEmail) {
        User user = userRepository.findByEmail(mentorEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        Mentor mentor = mentorRepository.findByUser(user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Only mentors can add slots"));

        MentorSlot slot = MentorSlot.builder()
                .mentor(mentor)
                .date(slotDto.getDate())
                .startTime(slotDto.getStartTime())
                .endTime(slotDto.getEndTime())
                .isBooked(false)
                .build();

        return mapToSlotResponse(mentorSlotRepository.save(slot));
    }

    private MentorResponse mapToMentorResponse(Mentor mentor) {
        return MentorResponse.builder()
                .id(mentor.getId())
                .fullName(mentor.getUser().getFullName())
                .username(mentor.getUser().getUsername())
                .avatarUrl(mentor.getUser().getAvatarUrl())
                .expertise(mentor.getExpertise())
                .bio(mentor.getBio())
                .rating(mentor.getRating())
                .totalSessions(mentor.getTotalSessions())
                .build();
    }

    private MentorSlotResponse mapToSlotResponse(MentorSlot slot) {
        return MentorSlotResponse.builder()
                .id(slot.getId())
                .date(slot.getDate())
                .startTime(slot.getStartTime())
                .endTime(slot.getEndTime())
                .isBooked(slot.isBooked())
                .build();
    }
}
