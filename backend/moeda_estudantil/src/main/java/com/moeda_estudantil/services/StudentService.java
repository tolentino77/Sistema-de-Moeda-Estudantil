package com.moeda_estudantil.services;

import com.moeda_estudantil.application.dto.request.StudentRequestDTO;
import com.moeda_estudantil.application.dto.response.StudentResponseDTO;
import com.moeda_estudantil.domain.entity.Student;
import com.moeda_estudantil.domain.converter.StudentConverter;
import com.moeda_estudantil.infrastructure.repositories.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentConverter studentConverter;

    // CREATE
    @Transactional
    public StudentResponseDTO create(StudentRequestDTO dto) {
        // Validar se email já existe
        if (studentRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Validar se CPF já existe
        if (studentRepository.existsBySocialId(dto.getSocialId())) {
            throw new RuntimeException("Social ID (CPF) already registered");
        }

        // Validar se RG já existe
        if (studentRepository.existsByDocument(dto.getDocument())) {
            throw new RuntimeException("Document (RG) already registered");
        }

        Student student = studentConverter.toEntity(dto);
        // TODO: Criptografar senha antes de salvar
        // student.setPassword(passwordEncoder.encode(student.getPassword()));

        Student savedStudent = studentRepository.save(student);
        return studentConverter.toResponseDTO(savedStudent);
    }

    // READ ALL
    public List<StudentResponseDTO> findAll() {
        return studentRepository.findAll()
                .stream()
                .map(studentConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY ID
    public StudentResponseDTO findById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        return studentConverter.toResponseDTO(student);
    }

    // READ BY EMAIL
    public StudentResponseDTO findByEmail(String email) {
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found with email: " + email));
        return studentConverter.toResponseDTO(student);
    }

    // READ BY INSTITUTION
    public List<StudentResponseDTO> findByInstitution(Long institutionId) {
        return studentRepository.findByInstitutionId(institutionId)
                .stream()
                .map(studentConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY COURSE
    public List<StudentResponseDTO> findByCourse(String course) {
        return studentRepository.findByCourse(course)
                .stream()
                .map(studentConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // UPDATE
    @Transactional
    public StudentResponseDTO update(Long id, StudentRequestDTO dto) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        // Validar se email já existe em outro aluno
        if (!student.getEmail().equals(dto.getEmail()) &&
                studentRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        studentConverter.updateEntityFromDTO(dto, student);
        Student updatedStudent = studentRepository.save(student);
        return studentConverter.toResponseDTO(updatedStudent);
    }

    // DELETE
    @Transactional
    public void delete(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }

    // ADD COINS
    @Transactional
    public void addCoins(Long studentId, Integer amount) {
        studentRepository.addCoins(studentId, amount);
    }

    // DEDUCT COINS
    @Transactional
    public boolean deductCoins(Long studentId, Integer amount) {
        int rowsAffected = studentRepository.deductCoins(studentId, amount);
        return rowsAffected > 0;
    }

    // GET BALANCE
    public Integer getBalance(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));
        return student.getScore();
    }
}