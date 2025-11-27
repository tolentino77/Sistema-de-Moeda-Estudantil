package com.moeda_estudantil.controller;

import com.moeda_estudantil.application.dto.request.InstitutionRequestDTO;
import com.moeda_estudantil.application.dto.response.InstitutionResponseDTO;
import com.moeda_estudantil.services.InstitutionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/institutions")
@CrossOrigin(origins = "*")
public class InstitutionController {

    @Autowired
    private InstitutionService institutionService;

    // CREATE
    @PostMapping("/institution")
    public ResponseEntity<InstitutionResponseDTO> create(@Valid @RequestBody InstitutionRequestDTO dto) {
        InstitutionResponseDTO response = institutionService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // GET ALL
    @GetMapping("/all")
    public ResponseEntity<List<InstitutionResponseDTO>> getAll() {
        List<InstitutionResponseDTO> institutions = institutionService.findAll();
        return ResponseEntity.ok(institutions);
    }

    // GET BY ID
    @GetMapping("/institution/{id}")
    public ResponseEntity<InstitutionResponseDTO> getById(@PathVariable Long id) {
        InstitutionResponseDTO institution = institutionService.findById(id);
        return ResponseEntity.ok(institution);
    }

    // GET BY CNPJ
    @GetMapping("/cnpj/{cnpj}")
    public ResponseEntity<InstitutionResponseDTO> getByCompanyDocument(@PathVariable String cnpj) {
        InstitutionResponseDTO institution = institutionService.findByCompanyDocument(cnpj);
        return ResponseEntity.ok(institution);
    }

    // SEARCH BY NAME
    @GetMapping("/search/{name}")
    public ResponseEntity<InstitutionResponseDTO> searchByName(@PathVariable String name) {
        InstitutionResponseDTO institution = institutionService.searchByName(name);
        return ResponseEntity.ok(institution);
    }

    // UPDATE
    @PutMapping("/institution/{id}")
    public ResponseEntity<InstitutionResponseDTO> update(@PathVariable Long id,
                                                         @Valid @RequestBody InstitutionRequestDTO dto) {
        InstitutionResponseDTO response = institutionService.update(id, dto);
        return ResponseEntity.ok(response);
    }

    // DELETE
    @DeleteMapping("/institution/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        institutionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}