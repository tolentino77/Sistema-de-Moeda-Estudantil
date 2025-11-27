package com.moeda_estudantil.services;

import com.moeda_estudantil.application.dto.request.ProfessorRequestDTO;
import com.moeda_estudantil.application.dto.response.ProfessorResponseDTO;
import com.moeda_estudantil.domain.entity.Professor;
import com.moeda_estudantil.domain.converter.ProfessorConverter;
import com.moeda_estudantil.infrastructure.repositories.ProfessorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private ProfessorConverter professorConverter;

    // CREATE
    @Transactional
    public ProfessorResponseDTO create(ProfessorRequestDTO dto) {
        // Validar se email já existe
        if (professorRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Validar se CPF já existe
        if (professorRepository.existsBySocialId(dto.getSocialId())) {
            throw new RuntimeException("Social ID (CPF) already registered");
        }

        Professor professor = professorConverter.toEntity(dto);
        // TODO: Criptografar senha antes de salvar
        // professor.setPassword(passwordEncoder.encode(professor.getPassword()));

        Professor savedProfessor = professorRepository.save(professor);
        return professorConverter.toResponseDTO(savedProfessor);
    }

    // READ ALL
    public List<ProfessorResponseDTO> findAll() {
        return professorRepository.findAll()
                .stream()
                .map(professorConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY ID
    public ProfessorResponseDTO findById(Long id) {
        Professor professor = professorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professor not found with id: " + id));
        return professorConverter.toResponseDTO(professor);
    }

    // READ BY EMAIL
    public ProfessorResponseDTO findByEmail(String email) {
        Professor professor = professorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Professor not found with email: " + email));
        return professorConverter.toResponseDTO(professor);
    }

    // READ BY INSTITUTION
    public List<ProfessorResponseDTO> findByInstitution(Long institutionId) {
        return professorRepository.findByInstitutionId(institutionId)
                .stream()
                .map(professorConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY DEPARTMENT
    public List<ProfessorResponseDTO> findByDepartment(String department) {
        return professorRepository.findByDepartment(department)
                .stream()
                .map(professorConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // UPDATE
    @Transactional
    public ProfessorResponseDTO update(Long id, ProfessorRequestDTO dto) {
        Professor professor = professorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professor not found with id: " + id));

        // Validar se email já existe em outro professor
        if (!professor.getEmail().equals(dto.getEmail()) &&
                professorRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        professorConverter.updateEntityFromDTO(dto, professor);
        Professor updatedProfessor = professorRepository.save(professor);
        return professorConverter.toResponseDTO(updatedProfessor);
    }

    // DELETE
    @Transactional
    public void delete(Long id) {
        if (!professorRepository.existsById(id)) {
            throw new RuntimeException("Professor not found with id: " + id);
        }
        professorRepository.deleteById(id);
    }

    // ADD COINS (renovação semestral)
    @Transactional
    public void addCoins(Long professorId, Integer amount) {
        professorRepository.addCoins(professorId, amount);
    }

    // DEDUCT COINS (envio para aluno)
    @Transactional
    public boolean deductCoins(Long professorId, Integer amount) {
        int rowsAffected = professorRepository.deductCoins(professorId, amount);
        return rowsAffected > 0;
    }

    // GET BALANCE
    public Integer getBalance(Long professorId) {
        Professor professor = professorRepository.findById(professorId)
                .orElseThrow(() -> new RuntimeException("Professor not found with id: " + professorId));
        return professor.getScore();
    }
}