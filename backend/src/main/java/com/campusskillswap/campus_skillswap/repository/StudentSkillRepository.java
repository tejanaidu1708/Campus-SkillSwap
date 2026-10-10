package com.campusskillswap.campus_skillswap.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campusskillswap.campus_skillswap.entity.StudentSkill;

public interface StudentSkillRepository extends JpaRepository<StudentSkill, Long> {

    List<StudentSkill> findByStudentId(Long studentId);

}