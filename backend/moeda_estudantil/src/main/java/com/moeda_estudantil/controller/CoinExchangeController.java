package com.moeda_estudantil.controller;

import com.moeda_estudantil.application.dto.request.CoinExchangeRequestDTO;
import com.moeda_estudantil.application.dto.response.CoinExchangeResponseDTO;
import com.moeda_estudantil.services.CoinExchangeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exchanges")
@CrossOrigin(origins = "*")
public class CoinExchangeController {

    @Autowired
    private CoinExchangeService coinExchangeService;

    // CREATE (Aluno troca moedas por vantagem)
    @PostMapping("/exchange")
    public ResponseEntity<CoinExchangeResponseDTO> create(@Valid @RequestBody CoinExchangeRequestDTO dto) {
        CoinExchangeResponseDTO response = coinExchangeService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // GET ALL
    @GetMapping("/all")
    public ResponseEntity<List<CoinExchangeResponseDTO>> getAll() {
        List<CoinExchangeResponseDTO> exchanges = coinExchangeService.findAll();
        return ResponseEntity.ok(exchanges);
    }

    // GET BY ID
    @GetMapping("/exchange/{id}")
    public ResponseEntity<CoinExchangeResponseDTO> getById(@PathVariable Long id) {
        CoinExchangeResponseDTO exchange = coinExchangeService.findById(id);
        return ResponseEntity.ok(exchange);
    }

    // GET BY STUDENT
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<CoinExchangeResponseDTO>> getByStudent(@PathVariable Long studentId) {
        List<CoinExchangeResponseDTO> exchanges = coinExchangeService.findByStudent(studentId);
        return ResponseEntity.ok(exchanges);
    }

    // GET BY COMPANY
    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<CoinExchangeResponseDTO>> getByCompany(@PathVariable Long companyId) {
        List<CoinExchangeResponseDTO> exchanges = coinExchangeService.findByCompany(companyId);
        return ResponseEntity.ok(exchanges);
    }

    // GET BY REDEMPTION CODE
    @GetMapping("/code/{code}")
    public ResponseEntity<CoinExchangeResponseDTO> getByRedemptionCode(@PathVariable String code) {
        CoinExchangeResponseDTO exchange = coinExchangeService.findByRescueCode(code);
        return ResponseEntity.ok(exchange);
    }

    // GET BY STATUS
    @GetMapping("/status/{status}")
    public ResponseEntity<List<CoinExchangeResponseDTO>> getByStatus(@PathVariable String status) {
        List<CoinExchangeResponseDTO> exchanges = coinExchangeService.findByStatus(status);
        return ResponseEntity.ok(exchanges);
    }

    // UPDATE STATUS
    @PatchMapping("/exchange/{id}/status")
    public ResponseEntity<CoinExchangeResponseDTO> updateStatus(@PathVariable Long id,
                                                                @RequestParam String status) {
        CoinExchangeResponseDTO response = coinExchangeService.updateStatus(id, status);
        return ResponseEntity.ok(response);
    }

    // GET TOTAL SPENT BY STUDENT
    @GetMapping("/student/{studentId}/total")
    public ResponseEntity<Integer> getTotalSpentByStudent(@PathVariable Long studentId) {
        Integer total = coinExchangeService.getTotalSpentByStudent(studentId);
        return ResponseEntity.ok(total);
    }

    // GET COMPLETED EXCHANGES BY COMPANY
    @GetMapping("/company/{companyId}/completed")
    public ResponseEntity<Long> getCompletedExchangesByCompany(@PathVariable Long companyId) {
        Long total = coinExchangeService.getCompletedExchangesByCompany(companyId);
        return ResponseEntity.ok(total);
    }
}