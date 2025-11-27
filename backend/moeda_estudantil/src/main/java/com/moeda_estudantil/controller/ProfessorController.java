package com.moeda_estudantil.controller;

import com.moeda_estudantil.application.dto.request.ProfessorRequestDTO;
import com.moeda_estudantil.application.dto.response.ProfessorResponseDTO;
import com.moeda_estudantil.services.ProfessorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professors")
@CrossOrigin(origins = "*")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    // CREATE
    @PostMapping("/professor")
    public ResponseEntity<ProfessorResponseDTO> create(@Valid @RequestBody ProfessorRequestDTO dto) {
        ProfessorResponseDTO response = professorService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // GET ALL
    @GetMapping("/all")
    public ResponseEntity<List<ProfessorResponseDTO>> getAll() {
        List<ProfessorResponseDTO> professors = professorService.findAll();
        return ResponseEntity.ok(professors);
    }

    // GET BY ID
    @GetMapping("/professor/{id}")
    public ResponseEntity<ProfessorResponseDTO> getById(@PathVariable Long id) {
        ProfessorResponseDTO professor = professorService.findById(id);
        return ResponseEntity.ok(professor);
    }

    // GET BY EMAIL
    @GetMapping("/email/{email}")
    public ResponseEntity<ProfessorResponseDTO> getByEmail(@PathVariable String email) {
        ProfessorResponseDTO professor = professorService.findByEmail(email);
        return ResponseEntity.ok(professor);
    }

    // GET BY INSTITUTION
    @GetMapping("/institution/{institutionId}")
    public ResponseEntity<List<ProfessorResponseDTO>> getByInstitution(@PathVariable Long institutionId) {
        List<ProfessorResponseDTO> professors = professorService.findByInstitution(institutionId);
        return ResponseEntity.ok(professors);
    }

    // GET BY DEPARTMENT
    @GetMapping("/department/{department}")
    public ResponseEntity<List<ProfessorResponseDTO>> getByDepartment(@PathVariable String department) {
        List<ProfessorResponseDTO> professors = professorService.findByDepartment(department);
        return ResponseEntity.ok(professors);
    }

    // GET BALANCE
    @GetMapping("/professor/{id}/balance")
    public ResponseEntity<Integer> getBalance(@PathVariable Long id) {
        Integer balance = professorService.getBalance(id);
        return ResponseEntity.ok(balance);
    }

    // UPDATE
    @PutMapping("/professor/{id}")
    public ResponseEntity<ProfessorResponseDTO> update(@PathVariable Long id,
                                                       @Valid @RequestBody ProfessorRequestDTO dto) {
        ProfessorResponseDTO response = professorService.update(id, dto);
        return ResponseEntity.ok(response);
    }

    // DELETE
    @DeleteMapping("/professor/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        professorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}