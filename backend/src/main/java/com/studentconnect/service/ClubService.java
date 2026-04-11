package com.studentconnect.service;

import com.studentconnect.dto.ClubResponse;
import com.studentconnect.dto.CreateClubRequest;
import com.studentconnect.model.Club;
import com.studentconnect.model.ClubMember;
import com.studentconnect.model.User;
import com.studentconnect.model.enums.ClubMemberRole;
import com.studentconnect.repository.ClubMemberRepository;
import com.studentconnect.repository.ClubRepository;
import com.studentconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final ClubMemberRepository clubMemberRepository;
    private final UserRepository userRepository;
    private final GamificationService gamificationService;

    public Page<ClubResponse> getAllClubs(int page, int size, String search, String category, String currentUserEmail) {
        Pageable pageable = PageRequest.of(page, size);
        String cat = (category == null || category.equalsIgnoreCase("All")) ? null : category;
        
        Page<Club> clubs = clubRepository.findAllWithFilters(cat, search, pageable);
        
        User currentUser = currentUserEmail != null ? 
            userRepository.findByEmail(currentUserEmail).orElse(null) : null;

        return clubs.map(club -> mapToResponse(club, currentUser));
    }

    public ClubResponse getClubBySlug(String slug, String currentUserEmail) {
        Club club = clubRepository.findBySlug(slug)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Club not found"));
        
        User currentUser = currentUserEmail != null ? 
            userRepository.findByEmail(currentUserEmail).orElse(null) : null;
            
        return mapToResponse(club, currentUser);
    }

    @Transactional
    public ClubResponse createClub(CreateClubRequest request, String ownerEmail) {
        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Club club = Club.builder()
                .name(request.getName())
                .shortDescription(request.getShortDescription())
                .fullDescription(request.getFullDescription())
                .category(request.getCategory())
                .logoUrl(request.getLogoUrl())
                .bannerUrl(request.getBannerUrl())
                .websiteUrl(request.getWebsiteUrl())
                .isOpen(true)
                .tags(request.getTags() != null ? request.getTags() : List.of())
                .college(owner.getCollege())
                .leader(owner)
                .isVerified(false)
                .build();

        Club savedClub = clubRepository.save(club);

        // Owner is automatically a leader member
        ClubMember membership = ClubMember.builder()
                .club(savedClub)
                .user(owner)
                .role(ClubMemberRole.LEADER)
                .build();
        clubMemberRepository.save(membership);

        return mapToResponse(savedClub, owner);
    }

    @Transactional
    public void joinClub(Long clubId, String userEmail) {
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Club not found"));
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (clubMemberRepository.existsByClubAndUser(club, user)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Already a member of this club");
        }

        ClubMember membership = ClubMember.builder()
                .club(club)
                .user(user)
                .role(ClubMemberRole.MEMBER)
                .build();
        clubMemberRepository.save(membership);

        // Award points for joining a club
        gamificationService.addPoints(userEmail, 50);
    }

    @Transactional
    public void leaveClub(Long clubId, String userEmail) {
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Club not found"));
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (club.getLeader().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Leaders cannot leave their own club. Transfer leadership first.");
        }

        ClubMember membership = clubMemberRepository.findByClubAndUser(club, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Membership not found"));

        clubMemberRepository.delete(membership);
    }

    public List<User> getMembers(Long clubId) {
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Club not found"));
        
        return clubMemberRepository.findByClub(club).stream()
                .map(ClubMember::getUser)
                .collect(Collectors.toList());
    }

    public List<ClubResponse> getJoinedClubs(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        return clubMemberRepository.findByUser(user).stream()
                .map(membership -> mapToResponse(membership.getClub(), user))
                .collect(Collectors.toList());
    }

    public List<ClubResponse> getJoinedClubsByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        return clubMemberRepository.findByUser(user).stream()
                .map(membership -> mapToResponse(membership.getClub(), user))
                .collect(Collectors.toList());
    }

    private ClubResponse mapToResponse(Club club, User currentUser) {
        boolean isJoined = currentUser != null && clubMemberRepository.existsByClubAndUser(club, currentUser);
        long memberCount = clubMemberRepository.countByClub(club);

        return ClubResponse.builder()
                .id(club.getId())
                .name(club.getName())
                .slug(club.getSlug())
                .shortDescription(club.getShortDescription())
                .fullDescription(club.getFullDescription())
                .category(club.getCategory())
                .logoUrl(club.getLogoUrl())
                .bannerUrl(club.getBannerUrl())
                .websiteUrl(club.getWebsiteUrl())
                .isOpen(club.isOpen())
                .college(club.getCollege())
                .verified(club.isVerified())
                .tags(club.getTags())
                .memberCount(memberCount)
                .leaderName(club.getLeader().getFullName())
                .isJoined(isJoined)
                .build();
    }
}
