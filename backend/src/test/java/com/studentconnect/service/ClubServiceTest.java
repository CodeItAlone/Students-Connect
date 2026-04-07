package com.studentconnect.service;

import com.studentconnect.model.Club;
import com.studentconnect.model.User;
import com.studentconnect.repository.ClubMemberRepository;
import com.studentconnect.repository.ClubRepository;
import com.studentconnect.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClubServiceTest {

    @Mock
    private ClubRepository clubRepository;

    @Mock
    private ClubMemberRepository clubMemberRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private GamificationService gamificationService;

    @InjectMocks
    private ClubService clubService;

    @Test
    void joinClub_ShouldAwardPoints_WhenJoinSuccessful() {
        // Arrange
        String email = "student@example.com";
        Long clubId = 1L;
        User user = User.builder().id(2L).email(email).build();
        Club club = Club.builder().id(clubId).leader(User.builder().id(3L).build()).build();

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(clubRepository.findById(clubId)).thenReturn(Optional.of(club));
        when(clubMemberRepository.existsByClubAndUser(club, user)).thenReturn(false);

        // Act
        clubService.joinClub(clubId, email);

        // Assert
        verify(clubMemberRepository, times(1)).save(any());
        verify(gamificationService, times(1)).addPoints(email, 50);
    }

    @Test
    void joinClub_ShouldThrowException_WhenAlreadyMember() {
        // Arrange
        String email = "student@example.com";
        Long clubId = 1L;
        User user = User.builder().id(2L).email(email).build();
        Club club = Club.builder().id(clubId).leader(User.builder().id(3L).build()).build();

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(clubRepository.findById(clubId)).thenReturn(Optional.of(club));
        when(clubMemberRepository.existsByClubAndUser(club, user)).thenReturn(true);

        // Act & Assert
        assertThrows(ResponseStatusException.class, () -> clubService.joinClub(clubId, email));
    }
}
