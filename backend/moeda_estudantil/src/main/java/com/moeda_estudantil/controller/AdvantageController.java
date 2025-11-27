package com.moeda_estudantil.controller;

import com.moeda_estudantil.application.dto.request.AdvantageRequestDTO;
import com.moeda_estudantil.application.dto.response.AdvantageResponseDTO;
import com.moeda_estudantil.services.AdvantageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/advantages")
@CrossOrigin(origins = "*")
public class AdvantageController {

    @Autowired
    private AdvantageService advantageService;

    // CREATE
    @PostMapping("/advantage")
    public ResponseEntity<AdvantageResponseDTO> create(@Valid @RequestBody AdvantageRequestDTO dto) {
        AdvantageResponseDTO response = advantageService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // GET ALL
    @GetMapping("/all")
    public ResponseEntity<List<AdvantageResponseDTO>> getAll() {
        List<AdvantageResponseDTO> advantages = advantageService.findAll();
        return ResponseEntity.ok(advantages);
    }

    // GET BY ID
    @GetMapping("/advantage/{id}")
    public ResponseEntity<AdvantageResponseDTO> getById(@PathVariable Long id) {
        AdvantageResponseDTO advantage = advantageService.findById(id);
        return ResponseEntity.ok(advantage);
    }

    // GET BY COMPANY
    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<AdvantageResponseDTO>> getByCompany(@PathVariable Long companyId) {
        List<AdvantageResponseDTO> advantages = advantageService.findByCompany(companyId);
        return ResponseEntity.ok(advantages);
    }

    // GET AFFORDABLE (que o aluno pode comprar)
    @GetMapping("/affordable/{maxCost}")
    public ResponseEntity<List<AdvantageResponseDTO>> getAffordable(@PathVariable Integer maxCost) {
        List<AdvantageResponseDTO> advantages = advantageService.findAffordable(maxCost);
        return ResponseEntity.ok(advantages);
    }

    // GET AVAILABLE (com estoque)
    @GetMapping("/available")
    public ResponseEntity<List<AdvantageResponseDTO>> getAvailable() {
        List<AdvantageResponseDTO> advantages = advantageService.findAvailable();
        return ResponseEntity.ok(advantages);
    }

    // SEARCH BY NAME
    @GetMapping("/search/{name}")
    public ResponseEntity<List<AdvantageResponseDTO>> searchByName(@PathVariable String name) {
        List<AdvantageResponseDTO> advantages = advantageService.searchByName(name);
        return ResponseEntity.ok(advantages);
    }

    // UPDATE
    @PutMapping("/advantage/{id}")
    public ResponseEntity<AdvantageResponseDTO> update(@PathVariable Long id,
                                                       @Valid @RequestBody AdvantageRequestDTO dto) {
        AdvantageResponseDTO response = advantageService.update(id, dto);
        return ResponseEntity.ok(response);
    }

    // DELETE
    @DeleteMapping("/advantage/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        advantageService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ADD STOCK
    @PatchMapping("/advantage/{id}/stock")
    public ResponseEntity<Void> addStock(@PathVariable Long id, @RequestParam Integer quantity) {
        advantageService.incrementQuantity(id, quantity);
        return ResponseEntity.ok().build();
    }
}