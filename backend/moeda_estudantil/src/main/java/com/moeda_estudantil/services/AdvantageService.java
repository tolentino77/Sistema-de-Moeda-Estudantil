package com.moeda_estudantil.services;

import com.moeda_estudantil.application.dto.request.AdvantageRequestDTO;
import com.moeda_estudantil.application.dto.response.AdvantageResponseDTO;
import com.moeda_estudantil.domain.entity.Advantage;
import com.moeda_estudantil.domain.converter.AdvantageConverter;
import com.moeda_estudantil.infrastructure.repositories.AdvantageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdvantageService {

    @Autowired
    private AdvantageRepository advantageRepository;

    @Autowired
    private AdvantageConverter advantageConverter;

    // CREATE
    @Transactional
    public AdvantageResponseDTO create(AdvantageRequestDTO dto) {
        Advantage advantage = advantageConverter.toEntity(dto);
        Advantage savedAdvantage = advantageRepository.save(advantage);
        return advantageConverter.toResponseDTO(savedAdvantage);
    }

    // READ ALL
    public List<AdvantageResponseDTO> findAll() {
        return advantageRepository.findAll()
                .stream()
                .map(advantageConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY ID
    public AdvantageResponseDTO findById(Long id) {
        Advantage advantage = advantageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Advantage not found with id: " + id));
        return advantageConverter.toResponseDTO(advantage);
    }

    // READ BY COMPANY
    public List<AdvantageResponseDTO> findByCompany(Long companyId) {
        return advantageRepository.findByCompanyId(companyId)
                .stream()
                .map(advantageConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // FIND AFFORDABLE (que o aluno pode comprar)
    public List<AdvantageResponseDTO> findAffordable(Integer maxCost) {
        return advantageRepository.findAffordableAdvantages(maxCost)
                .stream()
                .map(advantageConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // FIND AVAILABLE (com estoque)
    public List<AdvantageResponseDTO> findAvailable() {
        return advantageRepository.findAvailableAdvantages()
                .stream()
                .map(advantageConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // SEARCH BY NAME
    public List<AdvantageResponseDTO> searchByName(String name) {
        return advantageRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(advantageConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // UPDATE
    @Transactional
    public AdvantageResponseDTO update(Long id, AdvantageRequestDTO dto) {
        Advantage advantage = advantageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Advantage not found with id: " + id));

        advantageConverter.updateEntityFromDTO(dto, advantage);
        Advantage updatedAdvantage = advantageRepository.save(advantage);
        return advantageConverter.toResponseDTO(updatedAdvantage);
    }

    // DELETE
    @Transactional
    public void delete(Long id) {
        if (!advantageRepository.existsById(id)) {
            throw new RuntimeException("Advantage not found with id: " + id);
        }
        advantageRepository.deleteById(id);
    }

    // DECREMENT QUANTITY (quando aluno resgata)
    @Transactional
    public boolean decrementQuantity(Long advantageId) {
        int rowsAffected = advantageRepository.decrementQuantity(advantageId);
        return rowsAffected > 0;
    }

    // INCREMENT QUANTITY (reposição de estoque)
    @Transactional
    public void incrementQuantity(Long advantageId, Integer amount) {
        advantageRepository.incrementQuantity(advantageId, amount);
    }
}