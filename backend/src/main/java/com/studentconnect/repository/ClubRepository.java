package com.studentconnect.repository;

import com.studentconnect.model.Club;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ClubRepository extends JpaRepository<Club, Long> {

    Optional<Club> findBySlug(String slug);

    boolean existsBySlug(String slug);
    long countByIsVerified(boolean isVerified);

    @Query("SELECT c FROM Club c WHERE " +
           "(:category IS NULL OR c.category = :category) AND " +
           "(:search IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(c.fullDescription) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Club> findAllWithFilters(@Param("category") String category, @Param("search") String search, Pageable pageable);
}
