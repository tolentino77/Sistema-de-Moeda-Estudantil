package com.moeda_estudantil.controller;

import com.moeda_estudantil.application.dto.request.CompanyRequestDTO;
import com.moeda_estudantil.application.dto.response.CompanyResponseDTO;
import com.moeda_estudantil.services.CompanyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "*")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    // CREATE
    @PostMapping("/company")
    public ResponseEntity<CompanyResponseDTO> create(@Valid @RequestBody CompanyRequestDTO dto) {
        CompanyResponseDTO response = companyService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // GET ALL
    @GetMapping("/all")
    public ResponseEntity<List<CompanyResponseDTO>> getAll() {
        List<CompanyResponseDTO> companies = companyService.findAll();
        return ResponseEntity.ok(companies);
    }

    // GET BY ID
    @GetMapping("/company/{id}")
    public ResponseEntity<CompanyResponseDTO> getById(@PathVariable Long id) {
        CompanyResponseDTO company = companyService.findById(id);
        return ResponseEntity.ok(company);
    }

    // GET BY EMAIL
    @GetMapping("/email/{email}")
    public ResponseEntity<CompanyResponseDTO> getByEmail(@PathVariable String email) {
        CompanyResponseDTO company = companyService.findByEmail(email);
        return ResponseEntity.ok(company);
    }

    // SEARCH BY TRADE NAME
    @GetMapping("/search/{name}")
    public ResponseEntity<List<CompanyResponseDTO>> searchByTradeName(@PathVariable String name) {
        List<CompanyResponseDTO> companies = companyService.searchByTradeName(name);
        return ResponseEntity.ok(companies);
    }

    // UPDATE
    @PutMapping("/company/{id}")
    public ResponseEntity<CompanyResponseDTO> update(@PathVariable Long id,
                                                     @Valid @RequestBody CompanyRequestDTO dto) {
        CompanyResponseDTO response = companyService.update(id, dto);
        return ResponseEntity.ok(response);
    }

    // DELETE
    @DeleteMapping("/company/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        companyService.delete(id);
        return ResponseEntity.noContent().build();
    }
}