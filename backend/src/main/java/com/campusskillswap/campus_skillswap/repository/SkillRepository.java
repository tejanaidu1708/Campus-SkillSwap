package com.campusskillswap.campus_skillswap.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campusskillswap.campus_skillswap.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {

}
