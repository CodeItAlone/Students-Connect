package com.studentconnect.service;

import com.studentconnect.dto.CreateOpportunityRequest;
import com.studentconnect.dto.OpportunityResponse;
import com.studentconnect.model.Opportunity;
import com.studentconnect.model.User;
import com.studentconnect.model.enums.OpportunityType;
import com.studentconnect.repository.OpportunityRepository;
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

@Service
@RequiredArgsConstructor
public class OpportunityService {

    private final OpportunityRepository opportunityRepository;
    private final UserRepository userRepository;

    public Page<OpportunityResponse> getAllOpportunities(int page, int size, String type, String search) {
        Pageable pageable = PageRequest.of(page, size);
        OpportunityType opportunityType = (type == null || type.equalsIgnoreCase("All")) ? null : OpportunityType.valueOf(type.toUpperCase());
        
        Page<Opportunity> opportunities = opportunityRepository.findAllWithFilters(opportunityType, search, pageable);
        
        return opportunities.map(this::mapToResponse);
    }

    public OpportunityResponse getOpportunityById(Long id) {
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Opportunity not found"));
        return mapToResponse(opportunity);
    }

    @Transactional
    public OpportunityResponse createOpportunity(CreateOpportunityRequest request, String adminEmail) {
        User user = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found"));

        // Restricted to ADMIN only
        if (!"ADMIN".equals(user.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only admins can post opportunities");
        }

        Opportunity opportunity = Opportunity.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .type(request.getType())
                .company(request.getCompany())
                .location(request.getLocation())
                .isRemote(request.isRemote())
                .applicationUrl(request.getApplicationUrl())
                .deadline(request.getDeadline())
                .tags(request.getTags() != null ? request.getTags() : List.of())
                .postedBy(user)
                .build();

        return mapToResponse(opportunityRepository.save(opportunity));
    }

    @Transactional
    public void deleteOpportunity(Long id, String adminEmail) {
        User user = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found"));

        if (!"ADMIN".equals(user.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only admins can delete opportunities");
        }

        if (!opportunityRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Opportunity not found");
        }

        opportunityRepository.deleteById(id);
    }

    private OpportunityResponse mapToResponse(Opportunity opportunity) {
        return OpportunityResponse.builder()
                .id(opportunity.getId())
                .title(opportunity.getTitle())
                .description(opportunity.getDescription())
                .type(opportunity.getType())
                .company(opportunity.getCompany())
                .location(opportunity.getLocation())
                .isRemote(opportunity.isRemote())
                .applicationUrl(opportunity.getApplicationUrl())
                .deadline(opportunity.getDeadline())
                .tags(opportunity.getTags())
                .postedByName(opportunity.getPostedBy().getFullName())
                .build();
    }
}
