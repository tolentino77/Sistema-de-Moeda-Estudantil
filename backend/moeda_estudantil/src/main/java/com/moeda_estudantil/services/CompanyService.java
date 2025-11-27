package com.moeda_estudantil.services;

import com.moeda_estudantil.application.dto.request.CompanyRequestDTO;
import com.moeda_estudantil.application.dto.response.CompanyResponseDTO;
import com.moeda_estudantil.domain.entity.Company;
import com.moeda_estudantil.domain.converter.CompanyConverter;
import com.moeda_estudantil.infrastructure.repositories.CompanyRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CompanyConverter companyConverter;

    // CREATE
    @Transactional
    public CompanyResponseDTO create(CompanyRequestDTO dto) {
        // Validar se email já existe
        if (companyRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Validar se CNPJ já existe
        if (companyRepository.existsByCompanyDocument(dto.getCompanyDocument())) {
            throw new RuntimeException("Company document (CNPJ) already registered");
        }

        Company company = companyConverter.toEntity(dto);
        // TODO: Criptografar senha antes de salvar
        // company.setPassword(passwordEncoder.encode(company.getPassword()));

        Company savedCompany = companyRepository.save(company);
        return companyConverter.toResponseDTO(savedCompany);
    }

    // READ ALL
    public List<CompanyResponseDTO> findAll() {
        return companyRepository.findAll()
                .stream()
                .map(companyConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY ID
    public CompanyResponseDTO findById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
        return companyConverter.toResponseDTO(company);
    }

    // READ BY EMAIL
    public CompanyResponseDTO findByEmail(String email) {
        Company company = companyRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Company not found with email: " + email));
        return companyConverter.toResponseDTO(company);
    }

    // SEARCH BY TRADE NAME
    public List<CompanyResponseDTO> searchByTradeName(String name) {
        return companyRepository.findByTradeNameContainingIgnoreCase(name)
                .stream()
                .map(companyConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // UPDATE
    @Transactional
    public CompanyResponseDTO update(Long id, CompanyRequestDTO dto) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));

        // Validar se email já existe em outra empresa
        if (!company.getEmail().equals(dto.getEmail()) &&
                companyRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        companyConverter.updateEntityFromDTO(dto, company);
        Company updatedCompany = companyRepository.save(company);
        return companyConverter.toResponseDTO(updatedCompany);
    }

    // DELETE
    @Transactional
    public void delete(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new RuntimeException("Company not found with id: " + id);
        }
        companyRepository.deleteById(id);
    }
}