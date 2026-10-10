package com.campusskillswap.campus_skillswap.request;

import jakarta.persistence.*;

import com.campusskillswap.campus_skillswap.entity.Skill;
import com.campusskillswap.campus_skillswap.entity.Student;

@Entity
@Table(name = "skill_requests")
public class SkillRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private Student sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private Student receiver;

    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status;

    public SkillRequest() {
        this.status = RequestStatus.PENDING;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getSender() {
        return sender;
    }

    public void setSender(Student sender) {
        this.sender = sender;
    }

    public Student getReceiver() {
        return receiver;
    }

    public void setReceiver(Student receiver) {
        this.receiver = receiver;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }
}