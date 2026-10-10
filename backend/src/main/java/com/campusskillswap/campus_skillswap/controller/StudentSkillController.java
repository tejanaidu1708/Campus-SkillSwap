package com.campusskillswap.campus_skillswap.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.campusskillswap.campus_skillswap.entity.StudentSkill;
import com.campusskillswap.campus_skillswap.service.StudentSkillService;

@RestController
@RequestMapping("/api/student-skills")
public class StudentSkillController {

    private final StudentSkillService studentSkillService;

    public StudentSkillController(StudentSkillService studentSkillService) {
        this.studentSkillService = studentSkillService;
    }

    // ADD student skill
    @PostMapping
    public StudentSkill addStudentSkill(@RequestBody StudentSkill studentSkill) {
        return studentSkillService.addStudentSkill(studentSkill);
    }

    // GET all student skills
    @GetMapping
    public List<StudentSkill> getAllStudentSkills() {
        return studentSkillService.getAllStudentSkills();
    }

    // GET skills of a particular student
    @GetMapping("/student/{studentId}")
    public List<StudentSkill> getStudentSkills(@PathVariable Long studentId) {
        return studentSkillService.getStudentSkills(studentId);
    }

    // DELETE student skill
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudentSkill(@PathVariable Long id) {

        boolean deleted = studentSkillService.deleteStudentSkill(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}