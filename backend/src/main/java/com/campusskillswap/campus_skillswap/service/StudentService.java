package com.campusskillswap.campus_skillswap.service;

import java.util.List;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import org.springframework.stereotype.Service;

import com.campusskillswap.campus_skillswap.entity.Student;
import com.campusskillswap.campus_skillswap.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Create student
    public Student createStudent(Student student) {

        student.setPassword(passwordEncoder.encode(student.getPassword()));

        return studentRepository.save(student);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID
    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    // Update student
    public Student updateStudent(Long id, Student updatedStudent) {

        Student existingStudent = studentRepository.findById(id).orElse(null);

        if (existingStudent == null) {
            return null;
        }

        existingStudent.setName(updatedStudent.getName());
        existingStudent.setEmail(updatedStudent.getEmail());
        existingStudent.setPassword(updatedStudent.getPassword());
        existingStudent.setDepartment(updatedStudent.getDepartment());
        existingStudent.setYear(updatedStudent.getYear());

        return studentRepository.save(existingStudent);
    }

    // Delete student
    public boolean deleteStudent(Long id) {

        if (!studentRepository.existsById(id)) {
            return false;
        }

        studentRepository.deleteById(id);
        return true;
    }
    public Student loginStudent(String email, String password) {

    	Student student = studentRepository.findByEmail(email).orElse(null);
        if (student != null && passwordEncoder.matches(password, student.getPassword())) {
            return student;
        }

        return null;
    }
}