package com.moeda_estudantil.services;

import com.moeda_estudantil.application.dto.request.InstitutionRequestDTO;
import com.moeda_estudantil.application.dto.response.InstitutionResponseDTO;
import com.moeda_estudantil.domain.entity.Institution;
import com.moeda_estudantil.domain.converter.InstitutionConverter;
import com.moeda_estudantil.infrastructure.repositories.InstitutionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InstitutionService {

    @Autowired
    private InstitutionRepository institutionRepository;

    @Autowired
    private InstitutionConverter institutionConverter;

    // CREATE
    @Transactional
    public InstitutionResponseDTO create(InstitutionRequestDTO dto) {
        // Validar se CNPJ já existe
        if (institutionRepository.existsByCompanyDocument(dto.getCompanyDocument())) {
            throw new RuntimeException("Company document (CNPJ) already registered");
        }

        Institution institution = institutionConverter.toEntity(dto);
        Institution savedInstitution = institutionRepository.save(institution);
        return institutionConverter.toResponseDTO(savedInstitution);
    }

    // READ ALL
    public List<InstitutionResponseDTO> findAll() {
        return institutionRepository.findAll()
                .stream()
                .map(institutionConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY ID
    public InstitutionResponseDTO findById(Long id) {
        Institution institution = institutionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Institution not found with id: " + id));
        return institutionConverter.toResponseDTO(institution);
    }

    // READ BY CNPJ
    public InstitutionResponseDTO findByCompanyDocument(String companyDocument) {
        Institution institution = institutionRepository.findByCompanyDocument(companyDocument)
                .orElseThrow(() -> new RuntimeException("Institution not found with CNPJ: " + companyDocument));
        return institutionConverter.toResponseDTO(institution);
    }

    // SEARCH BY NAME
    public InstitutionResponseDTO searchByName(String name) {
        Institution institution = institutionRepository.findByNameContainingIgnoreCase(name)
                .orElseThrow(() -> new RuntimeException("Institution not found with name: " + name));
        return institutionConverter.toResponseDTO(institution);
    }

    // UPDATE
    @Transactional
    public InstitutionResponseDTO update(Long id, InstitutionRequestDTO dto) {
        Institution institution = institutionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Institution not found with id: " + id));

        institutionConverter.updateEntityFromDTO(dto, institution);
        Institution updatedInstitution = institutionRepository.save(institution);
        return institutionConverter.toResponseDTO(updatedInstitution);
    }

    // DELETE
    @Transactional
    public void delete(Long id) {
        if (!institutionRepository.existsById(id)) {
            throw new RuntimeException("Institution not found with id: " + id);
        }
        institutionRepository.deleteById(id);
    }
}