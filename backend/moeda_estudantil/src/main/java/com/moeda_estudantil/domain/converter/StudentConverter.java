package com.moeda_estudantil.domain.converter;

import com.moeda_estudantil.application.dto.request.StudentRequestDTO;
import com.moeda_estudantil.application.dto.response.StudentResponseDTO;
import com.moeda_estudantil.domain.entity.Institution;
import com.moeda_estudantil.domain.entity.Student;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class StudentConverter {

    public Student toEntity(StudentRequestDTO dto) {
        Student student = new Student();
        student.setName(dto.getName());
        student.setEmail(dto.getEmail());
        student.setPassword(dto.getPassword()); // Lembre-se de criptografar no service!
        student.setSocialId(dto.getSocialId());
        student.setDocument(dto.getDocument());
        student.setAddress(dto.getAddress());
        student.setCourse(dto.getCourse());
        student.setScore(0); // Inicia com 0 moedas
        student.setRegisterDate(LocalDateTime.now());

        // Set institution
        if (dto.getInstitutionId() != null) {
            Institution institution = new Institution();
            institution.setId(dto.getInstitutionId());
            student.setInstitution(institution);
        }

        return student;
    }

    public StudentResponseDTO toResponseDTO(Student entity) {
        StudentResponseDTO dto = new StudentResponseDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setEmail(entity.getEmail());
        dto.setPassword(entity.getPassword()); // INCLUINDO PASSWORD para validação de login
        dto.setSocialId(entity.getSocialId());
        dto.setDocument(entity.getDocument());
        dto.setAddress(entity.getAddress());
        dto.setCourse(entity.getCourse());
        dto.setScore(entity.getScore());
        dto.setRegisterDate(entity.getRegisterDate());

        // Set institution details
        if (entity.getInstitution() != null) {
            dto.setInstitutionId(entity.getInstitution().getId());
            dto.setInstitutionName(entity.getInstitution().getName());
        }

        return dto;
    }

    public void updateEntityFromDTO(StudentRequestDTO dto, Student entity) {
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setAddress(dto.getAddress());
        entity.setCourse(dto.getCourse());
        
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