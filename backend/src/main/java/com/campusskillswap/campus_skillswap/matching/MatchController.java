package com.campusskillswap.campus_skillswap.matching;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campusskillswap.campus_skillswap.entity.Student;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/{studentId}")
    public List<Student> getMatches(@PathVariable Long studentId) {
        return matchService.findMatches(studentId);
    }
}