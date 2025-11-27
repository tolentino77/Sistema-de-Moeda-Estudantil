package com.moeda_estudantil.controller;

import com.moeda_estudantil.application.dto.response.ExtractResponseDTO;
import com.moeda_estudantil.services.ExtractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/extracts")
@CrossOrigin(origins = "*")
public class ExtractController {

    @Autowired
    private ExtractService extractService;

    // GET ALL
    @GetMapping("/all")
    public ResponseEntity<List<ExtractResponseDTO>> getAll() {
        List<ExtractResponseDTO> extracts = extractService.findAll();
        return ResponseEntity.ok(extracts);
    }

    // GET BY STUDENT
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ExtractResponseDTO>> getByStudent(@PathVariable Long studentId) {
        List<ExtractResponseDTO> extracts = extractService.findByStudent(studentId);
        return ResponseEntity.ok(extracts);
    }

    // GET BY PROFESSOR
    @GetMapping("/professor/{professorId}")
    public ResponseEntity<List<ExtractResponseDTO>> getByProfessor(@PathVariable Long professorId) {
        List<ExtractResponseDTO> extracts = extractService.findByProfessor(professorId);
        return ResponseEntity.ok(extracts);
    }

    // GET BY STUDENT AND OPERATION TYPE
    @GetMapping("/student/{studentId}/type/{operationType}")
    public ResponseEntity<List<ExtractResponseDTO>> getByStudentAndOperationType(
            @PathVariable Long studentId,
            @PathVariable String operationType) {
        List<ExtractResponseDTO> extracts = extractService.findByStudentAndOperationType(studentId, operationType);
        return ResponseEntity.ok(extracts);
    }

    // GET BY PROFESSOR AND OPERATION TYPE
    @GetMapping("/professor/{professorId}/type/{operationType}")
    public ResponseEntity<List<ExtractResponseDTO>> getByProfessorAndOperationType(
            @PathVariable Long professorId,
            @PathVariable String operationType) {
        List<ExtractResponseDTO> extracts = extractService.findByProfessorAndOperationType(professorId, operationType);
        return ResponseEntity.ok(extracts);
    }

    // GET BY STUDENT AND DATE RANGE
    @GetMapping("/student/{studentId}/range")
    public ResponseEntity<List<ExtractResponseDTO>> getByStudentAndDateRange(
            @PathVariable Long studentId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<ExtractResponseDTO> extracts = extractService.findByStudentAndDateRange(studentId, startDate, endDate);
        return ResponseEntity.ok(extracts);
    }

    // GET BY PROFESSOR AND DATE RANGE
    @GetMapping("/professor/{professorId}/range")
    public ResponseEntity<List<ExtractResponseDTO>> getByProfessorAndDateRange(
            @PathVariable Long professorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<ExtractResponseDTO> extracts = extractService.findByProfessorAndDateRange(professorId, startDate, endDate);
        return ResponseEntity.ok(extracts);
    }

    // GET BY OPERATION TYPE
    @GetMapping("/type/{operationType}")
    public ResponseEntity<List<ExtractResponseDTO>> getByOperationType(@PathVariable String operationType) {
        List<ExtractResponseDTO> extracts = extractService.findByOperationType(operationType);
        return ResponseEntity.ok(extracts);
    }
}