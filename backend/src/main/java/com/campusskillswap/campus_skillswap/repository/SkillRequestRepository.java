package com.campusskillswap.campus_skillswap.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campusskillswap.campus_skillswap.request.SkillRequest;
import com.campusskillswap.campus_skillswap.request.RequestStatus;

public interface SkillRequestRepository extends JpaRepository<SkillRequest, Long> {

    List<SkillRequest> findByReceiverId(Long receiverId);

    List<SkillRequest> findBySenderId(Long senderId);

    List<SkillRequest> findByReceiverIdAndStatus(
            Long receiverId,
            RequestStatus status
    );
}