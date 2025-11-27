package com.moeda_estudantil.controller;

import com.moeda_estudantil.application.dto.request.TransactionRequestDTO;
import com.moeda_estudantil.application.dto.response.TransactionResponseDTO;
import com.moeda_estudantil.services.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // CREATE (Professor envia moedas para Aluno)
    @PostMapping("/transaction")
    public ResponseEntity<TransactionResponseDTO> create(@Valid @RequestBody TransactionRequestDTO dto) {
        TransactionResponseDTO response = transactionService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // GET ALL
    @GetMapping("/all")
    public ResponseEntity<List<TransactionResponseDTO>> getAll() {
        List<TransactionResponseDTO> transactions = transactionService.findAll();
        return ResponseEntity.ok(transactions);
    }

    // GET BY ID
    @GetMapping("/transaction/{id}")
    public ResponseEntity<TransactionResponseDTO> getById(@PathVariable Long id) {
        TransactionResponseDTO transaction = transactionService.findById(id);
        return ResponseEntity.ok(transaction);
    }

    // GET BY STUDENT
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<TransactionResponseDTO>> getByStudent(@PathVariable Long studentId) {
        List<TransactionResponseDTO> transactions = transactionService.findByStudent(studentId);
        return ResponseEntity.ok(transactions);
    }

    // GET BY PROFESSOR
    @GetMapping("/professor/{professorId}")
    public ResponseEntity<List<TransactionResponseDTO>> getByProfessor(@PathVariable Long professorId) {
        List<TransactionResponseDTO> transactions = transactionService.findByProfessor(professorId);
        return ResponseEntity.ok(transactions);
    }

    // GET BY STUDENT AND DATE RANGE
    @GetMapping("/student/{studentId}/range")
    public ResponseEntity<List<TransactionResponseDTO>> getByStudentAndDateRange(
            @PathVariable Long studentId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<TransactionResponseDTO> transactions = transactionService.findByStudentAndDateRange(studentId, startDate, endDate);
        return ResponseEntity.ok(transactions);
    }

    // GET BY PROFESSOR AND DATE RANGE
    @GetMapping("/professor/{professorId}/range")
    public ResponseEntity<List<TransactionResponseDTO>> getByProfessorAndDateRange(
            @PathVariable Long professorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<TransactionResponseDTO> transactions = transactionService.findByProfessorAndDateRange(professorId, startDate, endDate);
        return ResponseEntity.ok(transactions);
    }

    // GET TOTAL SENT BY PROFESSOR
    @GetMapping("/professor/{professorId}/total")
    public ResponseEntity<Integer> getTotalSentByProfessor(@PathVariable Long professorId) {
        Integer total = transactionService.getTotalSentByProfessor(professorId);
        return ResponseEntity.ok(total);
    }

    // GET TOTAL RECEIVED BY STUDENT
    @GetMapping("/student/{studentId}/total")
    public ResponseEntity<Integer> getTotalReceivedByStudent(@PathVariable Long studentId) {
        Integer total = transactionService.getTotalReceivedByStudent(studentId);
        return ResponseEntity.ok(total);
    }
}