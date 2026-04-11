package com.studentconnect.repository;

import com.studentconnect.model.Club;
import com.studentconnect.model.ClubMember;
import com.studentconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClubMemberRepository extends JpaRepository<ClubMember, Long> {

    List<ClubMember> findByClub(Club club);

    Optional<ClubMember> findByClubAndUser(Club club, User user);

    boolean existsByClubAndUser(Club club, User user);

    long countByClub(Club club);
    List<ClubMember> findByUser(User user);
}
