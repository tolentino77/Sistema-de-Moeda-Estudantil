package com.moeda_estudantil.services;

import com.moeda_estudantil.application.dto.request.TransactionRequestDTO;
import com.moeda_estudantil.application.dto.response.TransactionResponseDTO;
import com.moeda_estudantil.domain.entity.Transaction;
import com.moeda_estudantil.domain.converter.TransactionConverter;
import com.moeda_estudantil.infrastructure.repositories.TransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionConverter transactionConverter;

    @Autowired
    private ProfessorService professorService;

    @Autowired
    private StudentService studentService;

    // CREATE (Professor envia moedas para Aluno)
    @Transactional
    public TransactionResponseDTO create(TransactionRequestDTO dto) {
        // Validar saldo do professor
        Integer professorBalance = professorService.getBalance(dto.getProfessorId());
        if (professorBalance < dto.getCoinValue()) {
            throw new RuntimeException("Insufficient coins balance");
        }

        // Deduzir moedas do professor
        boolean deducted = professorService.deductCoins(dto.getProfessorId(), dto.getCoinValue());
        if (!deducted) {
            throw new RuntimeException("Failed to deduct coins from professor");
        }

        // Adicionar moedas ao aluno
        studentService.addCoins(dto.getStudentId(), dto.getCoinValue());

        // Salvar transação
        Transaction transaction = transactionConverter.toEntity(dto);
        Transaction savedTransaction = transactionRepository.save(transaction);

        // TODO: Enviar email de notificação ao aluno

        return transactionConverter.toResponseDTO(savedTransaction);
    }

    // READ ALL
    public List<TransactionResponseDTO> findAll() {
        return transactionRepository.findAll()
                .stream()
                .map(transactionConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY ID
    public TransactionResponseDTO findById(Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));
        return transactionConverter.toResponseDTO(transaction);
    }

    // READ BY STUDENT
    public List<TransactionResponseDTO> findByStudent(Long studentId) {
        return transactionRepository.findByStudentIdOrderByDateDesc(studentId)
                .stream()
                .map(transactionConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY PROFESSOR
    public List<TransactionResponseDTO> findByProfessor(Long professorId) {
        return transactionRepository.findByProfessorIdOrderByDateDesc(professorId)
                .stream()
                .map(transactionConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY DATE RANGE (Student)
    public List<TransactionResponseDTO> findByStudentAndDateRange(Long studentId,
                                                                  LocalDateTime startDate,
                                                                  LocalDateTime endDate) {
        return transactionRepository.findByStudentAndDateRange(studentId, startDate, endDate)
                .stream()
                .map(transactionConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY DATE RANGE (Professor)
    public List<TransactionResponseDTO> findByProfessorAndDateRange(Long professorId,
                                                                    LocalDateTime startDate,
                                                                    LocalDateTime endDate) {
        return transactionRepository.findByProfessorAndDateRange(professorId, startDate, endDate)
                .stream()
                .map(transactionConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // GET TOTAL SENT BY PROFESSOR
    public Integer getTotalSentByProfessor(Long professorId) {
        Integer total = transactionRepository.getTotalCoinsSentByProfessor(professorId);
        return total != null ? total : 0;
    }

    // GET TOTAL RECEIVED BY STUDENT
    public Integer getTotalReceivedByStudent(Long studentId) {
        Integer total = transactionRepository.getTotalCoinsReceivedByStudent(studentId);
        return total != null ? total : 0;
    }
}