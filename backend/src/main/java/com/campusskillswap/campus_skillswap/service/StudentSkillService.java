package com.campusskillswap.campus_skillswap.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.campusskillswap.campus_skillswap.entity.StudentSkill;
import com.campusskillswap.campus_skillswap.repository.StudentSkillRepository;

@Service
public class StudentSkillService {

    private final StudentSkillRepository studentSkillRepository;

    public StudentSkillService(StudentSkillRepository studentSkillRepository) {
        this.studentSkillRepository = studentSkillRepository;
    }

    // Add student skill
    public StudentSkill addStudentSkill(StudentSkill studentSkill) {
        return studentSkillRepository.save(studentSkill);
    }

    // Get all student skills
    public List<StudentSkill> getAllStudentSkills() {
        return studentSkillRepository.findAll();
    }

    // Get skills of a particular student
    public List<StudentSkill> getStudentSkills(Long studentId) {
        return studentSkillRepository.findByStudentId(studentId);
    }

    // Delete student skill
    public boolean deleteStudentSkill(Long id) {

        if (!studentSkillRepository.existsById(id)) {
            return false;
        }

        studentSkillRepository.deleteById(id);
        return true;
    }
}