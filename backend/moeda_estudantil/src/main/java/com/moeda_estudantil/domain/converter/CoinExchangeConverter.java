package com.moeda_estudantil.domain.converter;

import com.moeda_estudantil.application.dto.request.CoinExchangeRequestDTO;
import com.moeda_estudantil.application.dto.response.CoinExchangeResponseDTO;
import com.moeda_estudantil.domain.entity.Advantage;
import com.moeda_estudantil.domain.entity.CoinExchange;
import com.moeda_estudantil.domain.entity.Student;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

@Component
public class CoinExchangeConverter {

    public CoinExchange toEntity(CoinExchangeRequestDTO dto) {
        CoinExchange exchange = new CoinExchange();
        exchange.setExchangeDate(LocalDateTime.now());
        exchange.setRescueCode(UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        exchange.setStatus("PENDING");

        // Set student
        if (dto.getStudentId() != null) {
            Student student = new Student();
            student.setId(dto.getStudentId());
            exchange.setStudent(student);
        }

        // Set advantage
        if (dto.getAdvantageId() != null) {
            Advantage advantage = new Advantage();
            advantage.setId(dto.getAdvantageId());
            exchange.setAdvantage(advantage);
        }

        return exchange;
    }

    public CoinExchangeResponseDTO toResponseDTO(CoinExchange entity) {
        CoinExchangeResponseDTO dto = new CoinExchangeResponseDTO();
        dto.setId(entity.getId());
        dto.setCoinValue(entity.getCoinValue());
        dto.setRedemptionCode(entity.getRescueCode());
        dto.setStatus(entity.getStatus());
        dto.setDescription(entity.getDescription());
        dto.setExchangeDate(entity.getExchangeDate());

        // Set student details
        if (entity.getStudent() != null) {
            dto.setStudentId(entity.getStudent().getId());
            dto.setStudentName(entity.getStudent().getName());
        }

        // Set advantage details
        if (entity.getAdvantage() != null) {
            dto.setAdvantageId(entity.getAdvantage().getId());
            dto.setAdvantageName(entity.getAdvantage().getName());
        }

        return dto;
    }
}