package com.studentconnect.repository;

import com.studentconnect.model.Club;
import com.studentconnect.model.Event;
import com.studentconnect.model.enums.EventType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByClub(Club club);
    long countByStartDateAfter(java.time.LocalDateTime startDate);

    @Query("SELECT e FROM Event e WHERE " +
           "(:type IS NULL OR e.type = :type) AND " +
           "(:clubId IS NULL OR e.club.id = :clubId) AND " +
           "(:search IS NULL OR LOWER(e.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(e.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Event> findAllWithFilters(@Param("type") EventType type, @Param("clubId") Long clubId, @Param("search") String search, Pageable pageable);
}
