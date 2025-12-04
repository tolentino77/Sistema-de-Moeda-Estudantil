package com.moeda_estudantil.domain.converter;

import com.moeda_estudantil.application.dto.request.CompanyRequestDTO;
import com.moeda_estudantil.application.dto.response.CompanyResponseDTO;
import com.moeda_estudantil.domain.entity.Company;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class CompanyConverter {

    public Company toEntity(CompanyRequestDTO dto) {
        Company company = new Company();
        company.setCompanyNickname(dto.getCompanyNickname());
        company.setCompanyName(dto.getCompanyName());
        company.setCompanyDocument(dto.getCompanyDocument());
        company.setEmail(dto.getEmail());
        company.setPassword(dto.getPassword());
        company.setRegisterDate(LocalDateTime.now());

        return company;
    }

    public CompanyResponseDTO toResponseDTO(Company entity) {
        CompanyResponseDTO dto = new CompanyResponseDTO();
        dto.setId(entity.getId());
        dto.setCompanyNickname(entity.getCompanyNickname());
        dto.setCompanyName(entity.getCompanyName());
        dto.setCompanyDocument(entity.getCompanyDocument());
        dto.setEmail(entity.getEmail());
        dto.setPassword(entity.getPassword()); // INCLUINDO PASSWORD para validação de login
        dto.setRegisterDate(entity.getRegisterDate());

        return dto;
    }

    public void updateEntityFromDTO(CompanyRequestDTO dto, Company entity) {
        entity.setCompanyNickname(dto.getCompanyNickname());
        entity.setCompanyName(dto.getCompanyName());
        entity.setEmail(dto.getEmail());
        
        // Update password if provided
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            entity.setPassword(dto.getPassword());
        }
    }
}