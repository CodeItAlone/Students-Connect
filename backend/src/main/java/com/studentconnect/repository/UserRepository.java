package com.studentconnect.repository;

import com.studentconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    long countByVerified(boolean verified);

    Page<User> findAllByOrderByPointsDesc(Pageable pageable);
}
