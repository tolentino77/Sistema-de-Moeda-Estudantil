package com.moeda_estudantil.services;

import com.moeda_estudantil.application.dto.response.ExtractResponseDTO;
import com.moeda_estudantil.domain.converter.ExtractConverter;
import com.moeda_estudantil.infrastructure.repositories.ExtractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExtractService {

    @Autowired
    private ExtractRepository extractRepository;

    @Autowired
    private ExtractConverter extractConverter;

    // READ ALL
    public List<ExtractResponseDTO> findAll() {
        return extractRepository.findAll()
                .stream()
                .map(extractConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY STUDENT
    public List<ExtractResponseDTO> findByStudent(Long studentId) {
        return extractRepository.findByStudentIdOrderByDateDesc(studentId)
                .stream()
                .map(extractConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY PROFESSOR
    public List<ExtractResponseDTO> findByProfessor(Long professorId) {
        return extractRepository.findByProfessorIdOrderByDateDesc(professorId)
                .stream()
                .map(extractConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY STUDENT AND OPERATION TYPE
    public List<ExtractResponseDTO> findByStudentAndOperationType(Long studentId, String operationType) {
        return extractRepository.findByStudentIdAndOperationType(studentId, operationType)
                .stream()
                .map(extractConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY PROFESSOR AND OPERATION TYPE
    public List<ExtractResponseDTO> findByProfessorAndOperationType(Long professorId, String operationType) {
        return extractRepository.findByProfessorIdAndOperationType(professorId, operationType)
                .stream()
                .map(extractConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY STUDENT AND DATE RANGE
    public List<ExtractResponseDTO> findByStudentAndDateRange(Long studentId,
                                                              LocalDateTime startDate,
                                                              LocalDateTime endDate) {
        return extractRepository.findByStudentIdAndDateRange(studentId, startDate, endDate)
                .stream()
                .map(extractConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY PROFESSOR AND DATE RANGE
    public List<ExtractResponseDTO> findByProfessorAndDateRange(Long professorId,
                                                                LocalDateTime startDate,
                                                                LocalDateTime endDate) {
        return extractRepository.findByProfessorIdAndDateRange(professorId, startDate, endDate)
                .stream()
                .map(extractConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY OPERATION TYPE
    public List<ExtractResponseDTO> findByOperationType(String operationType) {
        return extractRepository.findByOperationType(operationType)
                .stream()
                .map(extractConverter::toResponseDTO)
                .collect(Collectors.toList());
    }
}