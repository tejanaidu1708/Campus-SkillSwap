package com.campusskillswap.campus_skillswap.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.campusskillswap.campus_skillswap.entity.Student;
import com.campusskillswap.campus_skillswap.service.StudentService;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // CREATE - Register student
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        return ResponseEntity.ok(studentService.createStudent(student));
    }

    // READ - Get all students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    // READ - Get student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {

        Student student = studentService.getStudentById(id);

        if (student == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(student);
    }

    // UPDATE - Update student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        Student updatedStudent = studentService.updateStudent(id, student);

        if (updatedStudent == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedStudent);
    }

    // DELETE - Delete student
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {

        boolean deleted = studentService.deleteStudent(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Student student) {

        Student loggedInStudent =
                studentService.loginStudent(student.getEmail(), student.getPassword());

        if (loggedInStudent != null) {
            return ResponseEntity.ok(loggedInStudent);
        }

        return ResponseEntity.status(401).body("Invalid email or password");
    }
}
