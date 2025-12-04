package com.moeda_estudantil.domain.converter;

import com.moeda_estudantil.application.dto.request.ProfessorRequestDTO;
import com.moeda_estudantil.application.dto.response.ProfessorResponseDTO;
import com.moeda_estudantil.domain.entity.Institution;
import com.moeda_estudantil.domain.entity.Professor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ProfessorConverter {

    public Professor toEntity(ProfessorRequestDTO dto) {
        Professor professor = new Professor();
        professor.setName(dto.getName());
        professor.setEmail(dto.getEmail());
        professor.setPassword(dto.getPassword()); // Lembre-se de criptografar no service!
        professor.setSocialId(dto.getSocialId());
        professor.setDepartment(dto.getDepartment());
        professor.setScore(1000); // Inicia com 1000 moedas por semestre
        professor.setRegisterDate(LocalDateTime.now());

        // Set institution
        if (dto.getInstitutionId() != null) {
            Institution institution = new Institution();
            institution.setId(dto.getInstitutionId());
            professor.setInstitution(institution);
        }

        return professor;
    }

    public ProfessorResponseDTO toResponseDTO(Professor entity) {
        ProfessorResponseDTO dto = new ProfessorResponseDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setEmail(entity.getEmail());
        dto.setPassword(entity.getPassword()); // INCLUINDO PASSWORD para validação de login
        dto.setSocialId(entity.getSocialId());
        dto.setDepartment(entity.getDepartment());
        dto.setScore(entity.getScore());
        dto.setRegisterDate(entity.getRegisterDate());

        // Set institution details
        if (entity.getInstitution() != null) {
            dto.setInstitutionId(entity.getInstitution().getId());
            dto.setInstitutionName(entity.getInstitution().getName());
        }

        return dto;
    }

    public void updateEntityFromDTO(ProfessorRequestDTO dto, Professor entity) {
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setDepartment(dto.getDepartment());
        
        // Update password if provided
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            entity.setPassword(dto.getPassword());
        }

        // Update institution if changed
        if (dto.getInstitutionId() != null) {
            Institution institution = new Institution();
            institution.setId(dto.getInstitutionId());
            entity.setInstitution(institution);
        }
    }
}