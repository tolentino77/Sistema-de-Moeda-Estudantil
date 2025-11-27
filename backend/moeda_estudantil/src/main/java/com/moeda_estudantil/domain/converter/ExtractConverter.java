package com.moeda_estudantil.domain.converter;

import com.moeda_estudantil.application.dto.response.ExtractResponseDTO;
import com.moeda_estudantil.domain.entity.Extract;
import org.springframework.stereotype.Component;

@Component
public class ExtractConverter {

    public ExtractResponseDTO toResponseDTO(Extract entity) {
        ExtractResponseDTO dto = new ExtractResponseDTO();
        dto.setId(entity.getId());
        dto.setOperationType(entity.getOperationType());
        dto.setValue(entity.getValue());
        dto.setDescription(entity.getDescription());
        dto.setOperationDate(entity.getOperationDate());

        // Determine user type and name
        if (entity.getStudent() != null) {
            dto.setUserName(entity.getStudent().getName());
            dto.setUserType("STUDENT");
        } else if (entity.getProfessor() != null) {
            dto.setUserName(entity.getProfessor().getName());
            dto.setUserType("PROFESSOR");
        }

        return dto;
    }
}