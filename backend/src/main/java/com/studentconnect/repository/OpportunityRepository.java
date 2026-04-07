package com.studentconnect.repository;

import com.studentconnect.model.Opportunity;
import com.studentconnect.model.enums.OpportunityType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {

    @Query("SELECT o FROM Opportunity o WHERE " +
           "(:type IS NULL OR o.type = :type) AND " +
           "(:search IS NULL OR LOWER(o.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(o.company) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Opportunity> findAllWithFilters(@Param("type") OpportunityType type, @Param("search") String search, Pageable pageable);
}
