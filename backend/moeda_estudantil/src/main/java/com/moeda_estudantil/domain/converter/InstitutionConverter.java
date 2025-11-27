package com.moeda_estudantil.domain.converter;

import com.moeda_estudantil.application.dto.request.InstitutionRequestDTO;
import com.moeda_estudantil.application.dto.response.InstitutionResponseDTO;
import com.moeda_estudantil.domain.entity.Institution;
import org.springframework.stereotype.Component;

@Component
public class InstitutionConverter {

    public Institution toEntity(InstitutionRequestDTO dto) {
        Institution institution = new Institution();
        institution.setName(dto.getName());
        institution.setCompanyDocument(dto.getCompanyDocument());
        institution.setAddress(dto.getAddress());
        institution.setContactName(dto.getContactName());

        return institution;
    }

    public InstitutionResponseDTO toResponseDTO(Institution entity) {
        InstitutionResponseDTO dto = new InstitutionResponseDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setCompanyDocument(entity.getCompanyDocument());
        dto.setAddress(entity.getAddress());
        dto.setContactName(entity.getContactName());

        return dto;
    }

    public void updateEntityFromDTO(InstitutionRequestDTO dto, Institution entity) {
        entity.setName(dto.getName());
        entity.setAddress(dto.getAddress());
        entity.setContactName(dto.getContactName());
        // Não atualiza companyDocument por segurança
    }
}