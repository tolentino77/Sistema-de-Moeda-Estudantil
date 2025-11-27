package com.moeda_estudantil.domain.converter;

import com.moeda_estudantil.application.dto.request.TransactionRequestDTO;
import com.moeda_estudantil.application.dto.response.TransactionResponseDTO;
import com.moeda_estudantil.domain.entity.Professor;
import com.moeda_estudantil.domain.entity.Student;
import com.moeda_estudantil.domain.entity.Transaction;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class TransactionConverter {

    public Transaction toEntity(TransactionRequestDTO dto) {
        Transaction transaction = new Transaction();
        transaction.setCoinValue(dto.getCoinValue());
        transaction.setMessage(dto.getMessage());
        transaction.setTransactionDate(LocalDateTime.now());

        // Set student
        if (dto.getStudentId() != null) {
            Student student = new Student();
            student.setId(dto.getStudentId());
            transaction.setStudent(student);
        }

        // Set professor
        if (dto.getProfessorId() != null) {
            Professor professor = new Professor();
            professor.setId(dto.getProfessorId());
            transaction.setProfessor(professor);
        }

        return transaction;
    }

    public TransactionResponseDTO toResponseDTO(Transaction entity) {
        TransactionResponseDTO dto = new TransactionResponseDTO();
        dto.setId(entity.getId());
        dto.setCoinValue(entity.getCoinValue());
        dto.setMessage(entity.getMessage());
        dto.setTransactionDate(entity.getTransactionDate());

        // Set student details
        if (entity.getStudent() != null) {
            dto.setStudentId(entity.getStudent().getId());
            dto.setStudentName(entity.getStudent().getName());
        }

        // Set professor details
        if (entity.getProfessor() != null) {
            dto.setProfessorId(entity.getProfessor().getId());
            dto.setProfessorName(entity.getProfessor().getName());
        }

        return dto;
    }
}