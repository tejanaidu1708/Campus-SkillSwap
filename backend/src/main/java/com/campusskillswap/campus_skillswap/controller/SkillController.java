package com.campusskillswap.campus_skillswap.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.campusskillswap.campus_skillswap.entity.Skill;
import com.campusskillswap.campus_skillswap.service.SkillService;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "http://localhost:5173")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<Skill> createSkill(@RequestBody Skill skill) {
        return ResponseEntity.ok(skillService.createSkill(skill));
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    // READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable Long id) {

        Skill skill = skillService.getSkillById(id);

        if (skill == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(skill);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(
            @PathVariable Long id,
            @RequestBody Skill skill) {

        Skill updatedSkill = skillService.updateSkill(id, skill);

        if (updatedSkill == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedSkill);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {

        boolean deleted = skillService.deleteSkill(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}