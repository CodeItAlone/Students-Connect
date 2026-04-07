package com.studentconnect.repository;

import com.studentconnect.model.Mentor;
import com.studentconnect.model.MentorSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MentorSlotRepository extends JpaRepository<MentorSlot, Long> {

    List<MentorSlot> findByMentorAndIsBookedFalse(Mentor mentor);

    List<MentorSlot> findByMentorAndDateGreaterThanEqual(Mentor mentor, LocalDate date);
}
