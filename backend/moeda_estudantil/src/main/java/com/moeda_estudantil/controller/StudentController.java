package com.moeda_estudantil.controller;

import com.moeda_estudantil.application.dto.request.StudentRequestDTO;
import com.moeda_estudantil.application.dto.response.StudentResponseDTO;
import com.moeda_estudantil.services.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // CREATE
    @PostMapping("/student")
    public ResponseEntity<StudentResponseDTO> create(@Valid @RequestBody StudentRequestDTO dto) {
        StudentResponseDTO response = studentService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // GET ALL
    @GetMapping("/all")
    public ResponseEntity<List<StudentResponseDTO>> getAll() {
        List<StudentResponseDTO> students = studentService.findAll();
        return ResponseEntity.ok(students);
    }

    // GET BY ID
    @GetMapping("/student/{id}")
    public ResponseEntity<StudentResponseDTO> getById(@PathVariable Long id) {
        StudentResponseDTO student = studentService.findById(id);
        return ResponseEntity.ok(student);
    }

    // GET BY EMAIL
    @GetMapping("/email/{email}")
    public ResponseEntity<StudentResponseDTO> getByEmail(@PathVariable String email) {
        StudentResponseDTO student = studentService.findByEmail(email);
        return ResponseEntity.ok(student);
    }

    // GET BY INSTITUTION
    @GetMapping("/institution/{institutionId}")
    public ResponseEntity<List<StudentResponseDTO>> getByInstitution(@PathVariable Long institutionId) {
        List<StudentResponseDTO> students = studentService.findByInstitution(institutionId);
        return ResponseEntity.ok(students);
    }

    // GET BY COURSE
    @GetMapping("/course/{course}")
    public ResponseEntity<List<StudentResponseDTO>> getByCourse(@PathVariable String course) {
        List<StudentResponseDTO> students = studentService.findByCourse(course);
        return ResponseEntity.ok(students);
    }

    // GET BALANCE
    @GetMapping("/student/{id}/balance")
    public ResponseEntity<Integer> getBalance(@PathVariable Long id) {
        Integer balance = studentService.getBalance(id);
        return ResponseEntity.ok(balance);
    }

    // UPDATE
    @PutMapping("/student/{id}")
    public ResponseEntity<StudentResponseDTO> update(@PathVariable Long id,
                                                     @Valid @RequestBody StudentRequestDTO dto) {
        StudentResponseDTO response = studentService.update(id, dto);
        return ResponseEntity.ok(response);
    }

    // DELETE
    @DeleteMapping("/student/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        studentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}