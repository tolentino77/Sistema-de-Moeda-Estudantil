package com.moeda_estudantil.services;

import com.moeda_estudantil.application.dto.request.TransactionRequestDTO;
import com.moeda_estudantil.application.dto.response.ProfessorResponseDTO;
import com.moeda_estudantil.application.dto.response.StudentResponseDTO;
import com.moeda_estudantil.application.dto.response.TransactionResponseDTO;
import com.moeda_estudantil.domain.entity.Transaction;
import com.moeda_estudantil.domain.converter.TransactionConverter;
import com.moeda_estudantil.infrastructure.repositories.TransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    private static final Logger logger = LoggerFactory.getLogger(TransactionService.class);

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionConverter transactionConverter;

    @Autowired
    private ProfessorService professorService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private EmailService emailService;

    // CREATE (Professor envia moedas para Aluno)
    @Transactional
    public TransactionResponseDTO create(TransactionRequestDTO dto) {
        logger.info("Iniciando transação: Professor {} -> Aluno {} | Valor: {} moedas",
                dto.getProfessorId(), dto.getStudentId(), dto.getCoinValue());

        // Validar saldo do professor
        Integer professorBalance = professorService.getBalance(dto.getProfessorId());
        if (professorBalance < dto.getCoinValue()) {
            logger.error("Saldo insuficiente para professor ID {}: saldo={}, necessário={}",
                    dto.getProfessorId(), professorBalance, dto.getCoinValue());
            throw new RuntimeException("Insufficient coins balance");
        }

        // Deduzir moedas do professor
        boolean deducted = professorService.deductCoins(dto.getProfessorId(), dto.getCoinValue());
        if (!deducted) {
            logger.error("Falha ao deduzir moedas do professor ID {}", dto.getProfessorId());
            throw new RuntimeException("Failed to deduct coins from professor");
        }

        // Adicionar moedas ao aluno
        studentService.addCoins(dto.getStudentId(), dto.getCoinValue());
        logger.info("Moedas transferidas com sucesso");

        // Salvar transação
        Transaction transaction = transactionConverter.toEntity(dto);
        Transaction savedTransaction = transactionRepository.save(transaction);

        // Buscar dados completos para envio de email
        ProfessorResponseDTO professor = professorService.findById(dto.getProfessorId());
        StudentResponseDTO student = studentService.findById(dto.getStudentId());

        // Enviar email para o professor
        try {
            emailService.sendTransactionEmailToProfessor(
                    professor.getEmail(),
                    professor.getName(),
                    student.getName(),
                    dto.getCoinValue(),
                    dto.getMessage()
            );
            logger.info("Email de confirmação enviado para o professor: {}", professor.getEmail());
        } catch (Exception e) {
            logger.error("Erro ao enviar email para o professor", e);
            // Não falhar a transação se o email falhar
        }

        // Enviar email para o aluno
        try {
            emailService.sendTransactionEmailToStudent(
                    student.getEmail(),
                    student.getName(),
                    professor.getName(),
                    dto.getCoinValue(),
                    dto.getMessage()
            );
            logger.info("Email de notificação enviado para o aluno: {}", student.getEmail());
        } catch (Exception e) {
            logger.error("Erro ao enviar email para o aluno", e);
            // Não falhar a transação se o email falhar
        }

        logger.info("Transação concluída com sucesso: ID {}", savedTransaction.getId());
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