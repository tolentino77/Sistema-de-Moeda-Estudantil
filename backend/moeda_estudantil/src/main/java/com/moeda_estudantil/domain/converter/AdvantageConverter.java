package com.moeda_estudantil.domain.converter;

import com.moeda_estudantil.application.dto.request.AdvantageRequestDTO;
import com.moeda_estudantil.application.dto.response.AdvantageResponseDTO;
import com.moeda_estudantil.domain.entity.Advantage;
import com.moeda_estudantil.domain.entity.Company;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class AdvantageConverter {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public Advantage toEntity(AdvantageRequestDTO dto) {
        Advantage advantage = new Advantage();
        advantage.setName(dto.getName());
        advantage.setDescription(dto.getDescription());
        advantage.setCoinCost(dto.getCoinCost());
        advantage.setPhotoUrl(dto.getPhotoUrl());
        advantage.setImageId(dto.getImageId());
        advantage.setQuantity(dto.getQuantity());
        advantage.setRegisterDate(LocalDateTime.now().format(DATE_FORMATTER));

        // Set company
        if (dto.getCompanyId() != null) {
            Company company = new Company();
            company.setId(dto.getCompanyId());
            advantage.setCompany(company);
        }

        return advantage;
    }

    public AdvantageResponseDTO toResponseDTO(Advantage entity) {
        AdvantageResponseDTO dto = new AdvantageResponseDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setCoinCost(entity.getCoinCost());
        dto.setPhotoUrl(entity.getPhotoUrl());
        dto.setImageId(entity.getImageId());
        dto.setQuantity(entity.getQuantity());
        dto.setRegisterDate(entity.getRegisterDate());

        // Set company details
        if (entity.getCompany() != null) {
            dto.setCompanyId(entity.getCompany().getId());
            dto.setCompanyName(entity.getCompany().getCompanyNickname());
        }

        return dto;
    }

    public void updateEntityFromDTO(AdvantageRequestDTO dto, Advantage entity) {
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setCoinCost(dto.getCoinCost());
        entity.setPhotoUrl(dto.getPhotoUrl());
        entity.setImageId(dto.getImageId());
        entity.setQuantity(dto.getQuantity());

        // Update company if changed
        if (dto.getCompanyId() != null) {
            Company company = new Company();
            company.setId(dto.getCompanyId());
            entity.setCompany(company);
        }
    }
}