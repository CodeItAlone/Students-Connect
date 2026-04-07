package com.studentconnect.repository;

import com.studentconnect.model.Mentor;
import com.studentconnect.model.MentorBooking;
import com.studentconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MentorBookingRepository extends JpaRepository<MentorBooking, Long> {

    List<MentorBooking> findByMentor(Mentor mentor);

    List<MentorBooking> findByStudent(User student);
}
