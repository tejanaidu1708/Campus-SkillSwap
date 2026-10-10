package com.campusskillswap.campus_skillswap.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.campusskillswap.campus_skillswap.entity.Skill;
import com.campusskillswap.campus_skillswap.entity.Student;
import com.campusskillswap.campus_skillswap.repository.SkillRequestRepository;
import com.campusskillswap.campus_skillswap.repository.SkillRepository;
import com.campusskillswap.campus_skillswap.repository.StudentRepository;
import com.campusskillswap.campus_skillswap.request.RequestStatus;
import com.campusskillswap.campus_skillswap.request.SkillRequest;

@Service
public class SkillRequestService {

    private final SkillRequestRepository requestRepository;
    private final StudentRepository studentRepository;
    private final SkillRepository skillRepository;

    public SkillRequestService(
            SkillRequestRepository requestRepository,
            StudentRepository studentRepository,
            SkillRepository skillRepository) {

        this.requestRepository = requestRepository;
        this.studentRepository = studentRepository;
        this.skillRepository = skillRepository;
    }

    // Send a new skill exchange request
    public SkillRequest sendRequest(
            Long senderId,
            Long receiverId,
            Long skillId) {

        Student sender = studentRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        Student receiver = studentRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        SkillRequest request = new SkillRequest();

        request.setSender(sender);
        request.setReceiver(receiver);
        request.setSkill(skill);
        request.setStatus(RequestStatus.PENDING);

        return requestRepository.save(request);
    }

    // Get requests received by a student
    public List<SkillRequest> getReceivedRequests(Long studentId) {
        return requestRepository.findByReceiverId(studentId);
    }

    // Get requests sent by a student
    public List<SkillRequest> getSentRequests(Long studentId) {
        return requestRepository.findBySenderId(studentId);
    }

    // Accept request
    public SkillRequest acceptRequest(Long requestId) {

        SkillRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(RequestStatus.ACCEPTED);

        return requestRepository.save(request);
    }

    // Reject request
    public SkillRequest rejectRequest(Long requestId) {

        SkillRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(RequestStatus.REJECTED);

        return requestRepository.save(request);
    }
}