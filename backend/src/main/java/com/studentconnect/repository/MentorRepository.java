package com.studentconnect.repository;

import com.studentconnect.model.Mentor;
import com.studentconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MentorRepository extends JpaRepository<Mentor, Long> {

    Optional<Mentor> findByUser(User user);

    @Query("SELECT m FROM Mentor m WHERE m.active = true AND (:expertise IS NULL OR :expertise MEMBER OF m.expertise)")
    List<Mentor> findByExpertise(@Param("expertise") String expertise);
}
