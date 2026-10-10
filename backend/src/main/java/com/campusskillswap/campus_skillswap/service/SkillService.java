package com.campusskillswap.campus_skillswap.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.campusskillswap.campus_skillswap.entity.Skill;
import com.campusskillswap.campus_skillswap.repository.SkillRepository;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    // Create skill
    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    // Get all skills
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    // Get skill by ID
    public Skill getSkillById(Long id) {
        return skillRepository.findById(id).orElse(null);
    }

    // Update skill
    public Skill updateSkill(Long id, Skill updatedSkill) {

        Skill existingSkill = skillRepository.findById(id).orElse(null);

        if (existingSkill == null) {
            return null;
        }

        existingSkill.setName(updatedSkill.getName());

        return skillRepository.save(existingSkill);
    }

    // Delete skill
    public boolean deleteSkill(Long id) {

        if (!skillRepository.existsById(id)) {
            return false;
        }

        skillRepository.deleteById(id);
        return true;
    }
}