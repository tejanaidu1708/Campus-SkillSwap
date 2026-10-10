package com.campusskillswap.campus_skillswap.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.campusskillswap.campus_skillswap.request.SkillRequest;
import com.campusskillswap.campus_skillswap.service.SkillRequestService;

@RestController
@RequestMapping("/api/requests")
public class SkillRequestController {

    private final SkillRequestService requestService;

    public SkillRequestController(SkillRequestService requestService) {
        this.requestService = requestService;
    }

    // Send request
    @PostMapping
    public SkillRequest sendRequest(
            @RequestParam Long senderId,
            @RequestParam Long receiverId,
            @RequestParam Long skillId) {

        return requestService.sendRequest(
                senderId,
                receiverId,
                skillId);
    }

    // Get received requests
    @GetMapping("/received/{studentId}")
    public List<SkillRequest> getReceivedRequests(
            @PathVariable Long studentId) {

        return requestService.getReceivedRequests(studentId);
    }

    // Get sent requests
    @GetMapping("/sent/{studentId}")
    public List<SkillRequest> getSentRequests(
            @PathVariable Long studentId) {

        return requestService.getSentRequests(studentId);
    }

    // Accept request
    @PutMapping("/{requestId}/accept")
    public SkillRequest acceptRequest(
            @PathVariable Long requestId) {

        return requestService.acceptRequest(requestId);
    }

    // Reject request
    @PutMapping("/{requestId}/reject")
    public SkillRequest rejectRequest(
            @PathVariable Long requestId) {

        return requestService.rejectRequest(requestId);
    }
}