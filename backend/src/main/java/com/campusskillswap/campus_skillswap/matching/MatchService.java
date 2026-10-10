package com.campusskillswap.campus_skillswap.matching;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.campusskillswap.campus_skillswap.entity.SkillType;
import com.campusskillswap.campus_skillswap.entity.Student;
import com.campusskillswap.campus_skillswap.entity.StudentSkill;
import com.campusskillswap.campus_skillswap.repository.StudentSkillRepository;

@Service
public class MatchService {

    private final StudentSkillRepository studentSkillRepository;

    public MatchService(StudentSkillRepository studentSkillRepository) {
        this.studentSkillRepository = studentSkillRepository;
    }

    public List<Student> findMatches(Long studentId) {

        // Get all student skills
        List<StudentSkill> allSkills = studentSkillRepository.findAll();

        // Skills that the current student can teach
        Set<Long> myTeachSkills = new HashSet<>();

        // Skills that the current student wants to learn
        Set<Long> myLearnSkills = new HashSet<>();

        Student currentStudent = null;

        // ------------------------------------------------
        // STEP 1: Get current student's skills
        // ------------------------------------------------
        for (StudentSkill ss : allSkills) {

            if (ss.getStudent() == null || ss.getSkill() == null) {
                continue;
            }

            if (ss.getStudent().getId().equals(studentId)) {

                currentStudent = ss.getStudent();

                if (ss.getType() == SkillType.TEACH) {
                    myTeachSkills.add(ss.getSkill().getId());
                }

                if (ss.getType() == SkillType.LEARN) {
                    myLearnSkills.add(ss.getSkill().getId());
                }
            }
        }

        // If student does not have any skills
        if (currentStudent == null) {
            return new ArrayList<>();
        }

        List<Student> matches = new ArrayList<>();
        Set<Long> addedStudents = new HashSet<>();

        // ------------------------------------------------
        // STEP 2: Check every other student
        // ------------------------------------------------
        for (StudentSkill otherSkill : allSkills) {

            if (otherSkill.getStudent() == null ||
                otherSkill.getSkill() == null) {
                continue;
            }

            Long otherStudentId = otherSkill.getStudent().getId();

            // Don't match the student with himself
            if (otherStudentId.equals(studentId)) {
                continue;
            }

            // ------------------------------------------------
            // STEP 3:
            // Does the other student TEACH something
            // that I WANT TO LEARN?
            // ------------------------------------------------
            boolean otherTeachesWhatINeed =
                    otherSkill.getType() == SkillType.TEACH
                    && myLearnSkills.contains(otherSkill.getSkill().getId());

            if (!otherTeachesWhatINeed) {
                continue;
            }

            // ------------------------------------------------
            // STEP 4:
            // Do I TEACH something that the other student
            // WANTS TO LEARN?
            // ------------------------------------------------
            boolean otherWantsWhatITeach = false;

            for (StudentSkill otherStudentSkill : allSkills) {

                if (otherStudentSkill.getStudent() == null ||
                    otherStudentSkill.getSkill() == null) {
                    continue;
                }

                if (!otherStudentSkill.getStudent()
                        .getId()
                        .equals(otherStudentId)) {
                    continue;
                }

                boolean otherWantsMySkill =
                        otherStudentSkill.getType() == SkillType.LEARN
                        && myTeachSkills.contains(
                                otherStudentSkill.getSkill().getId()
                        );

                if (otherWantsMySkill) {
                    otherWantsWhatITeach = true;
                    break;
                }
            }

            // ------------------------------------------------
            // STEP 5:
            // Add the student as a mutual match
            // ------------------------------------------------
            if (otherWantsWhatITeach &&
                !addedStudents.contains(otherStudentId)) {

                matches.add(otherSkill.getStudent());

                addedStudents.add(otherStudentId);
            }
        }

        return matches;
    }
}