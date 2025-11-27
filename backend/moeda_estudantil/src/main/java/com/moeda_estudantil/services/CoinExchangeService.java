package com.moeda_estudantil.services;

import com.moeda_estudantil.application.dto.request.CoinExchangeRequestDTO;
import com.moeda_estudantil.application.dto.response.AdvantageResponseDTO;
import com.moeda_estudantil.application.dto.response.CoinExchangeResponseDTO;
import com.moeda_estudantil.application.dto.response.CompanyResponseDTO;
import com.moeda_estudantil.application.dto.response.StudentResponseDTO;
import com.moeda_estudantil.domain.entity.CoinExchange;
import com.moeda_estudantil.domain.converter.CoinExchangeConverter;
import com.moeda_estudantil.infrastructure.repositories.CoinExchangeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CoinExchangeService {

    private static final Logger logger = LoggerFactory.getLogger(CoinExchangeService.class);

    @Autowired
    private CoinExchangeRepository coinExchangeRepository;

    @Autowired
    private CoinExchangeConverter coinExchangeConverter;

    @Autowired
    private StudentService studentService;

    @Autowired
    private AdvantageService advantageService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private QRCodeService qrCodeService;

    // CREATE (Aluno troca moedas por vantagem)
    @Transactional
    public CoinExchangeResponseDTO create(CoinExchangeRequestDTO dto) {
        logger.info("Iniciando troca de vantagem: Aluno {} -> Vantagem {}",
                dto.getStudentId(), dto.getAdvantageId());

        // Buscar vantagem
        AdvantageResponseDTO advantage = advantageService.findById(dto.getAdvantageId());

        // Validar estoque
        if (advantage.getQuantity() <= 0) {
            logger.error("Vantagem ID {} está sem estoque", dto.getAdvantageId());
            throw new RuntimeException("Advantage out of stock");
        }

        // Validar saldo do aluno
        Integer studentBalance = studentService.getBalance(dto.getStudentId());
        if (studentBalance < advantage.getCoinCost()) {
            logger.error("Saldo insuficiente para aluno ID {}: saldo={}, necessário={}",
                    dto.getStudentId(), studentBalance, advantage.getCoinCost());
            throw new RuntimeException("Insufficient coins balance");
        }

        // Deduzir moedas do aluno
        boolean deducted = studentService.deductCoins(dto.getStudentId(), advantage.getCoinCost());
        if (!deducted) {
            logger.error("Falha ao deduzir moedas do aluno ID {}", dto.getStudentId());
            throw new RuntimeException("Failed to deduct coins from student");
        }

        // Decrementar quantidade da vantagem
        boolean decremented = advantageService.decrementQuantity(dto.getAdvantageId());
        if (!decremented) {
            logger.error("Falha ao decrementar quantidade da vantagem ID {}", dto.getAdvantageId());
            throw new RuntimeException("Failed to decrement advantage quantity");
        }

        logger.info("Moedas deduzidas e estoque atualizado com sucesso");

        // Criar troca
        CoinExchange exchange = coinExchangeConverter.toEntity(dto);
        exchange.setCoinValue(advantage.getCoinCost());
        exchange.setDescription(advantage.getName() + " - " + advantage.getDescription());

        CoinExchange savedExchange = coinExchangeRepository.save(exchange);
        logger.info("Troca registrada com sucesso: ID {}", savedExchange.getId());

        // Buscar dados completos para envio de email
        StudentResponseDTO student = studentService.findById(dto.getStudentId());
        CompanyResponseDTO company = companyService.findById(advantage.getCompanyId());

        // Gerar QR Code para o código de resgate
        byte[] qrCodeImage = null;
        try {
            qrCodeImage = qrCodeService.generateSimpleRedemptionQRCode(savedExchange.getRescueCode());
            logger.info("QR Code gerado com sucesso para código: {}", savedExchange.getRescueCode());
        } catch (Exception e) {
            logger.error("Erro ao gerar QR Code", e);
            // Continua mesmo se falhar a geração do QR Code
        }

        // Enviar email para o aluno com QR Code
        try {
            emailService.sendExchangeEmailToStudent(
                    student.getEmail(),
                    student.getName(),
                    advantage.getName(),
                    advantage.getCoinCost(),
                    savedExchange.getRescueCode(),
                    qrCodeImage
            );
            logger.info("Email de troca enviado para o aluno: {}", student.getEmail());
        } catch (Exception e) {
            logger.error("Erro ao enviar email para o aluno", e);
            // Não falhar a troca se o email falhar
        }

        // Enviar email para a empresa parceira
        try {
            emailService.sendExchangeEmailToCompany(
                    company.getEmail(),
                    company.getCompanyNickname(),
                    student.getName(),
                    advantage.getName(),
                    savedExchange.getRescueCode()
            );
            logger.info("Email de notificação enviado para a empresa: {}", company.getEmail());
        } catch (Exception e) {
            logger.error("Erro ao enviar email para a empresa", e);
            // Não falhar a troca se o email falhar
        }

        logger.info("Troca de vantagem concluída com sucesso");
        return coinExchangeConverter.toResponseDTO(savedExchange);
    }

    // READ ALL
    public List<CoinExchangeResponseDTO> findAll() {
        return coinExchangeRepository.findAll()
                .stream()
                .map(coinExchangeConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY ID
    public CoinExchangeResponseDTO findById(Long id) {
        CoinExchange exchange = coinExchangeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coin exchange not found with id: " + id));
        return coinExchangeConverter.toResponseDTO(exchange);
    }

    // READ BY STUDENT
    public List<CoinExchangeResponseDTO> findByStudent(Long studentId) {
        return coinExchangeRepository.findByStudentIdOrderByDateDesc(studentId)
                .stream()
                .map(coinExchangeConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY COMPANY
    public List<CoinExchangeResponseDTO> findByCompany(Long companyId) {
        return coinExchangeRepository.findByCompanyIdOrderByDateDesc(companyId)
                .stream()
                .map(coinExchangeConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // READ BY REDEMPTION CODE
    public CoinExchangeResponseDTO findByRescueCode(String code) {
        CoinExchange exchange = coinExchangeRepository.findByRescueCode(code)
                .orElseThrow(() -> new RuntimeException("Coin exchange not found with code: " + code));
        return coinExchangeConverter.toResponseDTO(exchange);
    }

    // READ BY STATUS
    public List<CoinExchangeResponseDTO> findByStatus(String status) {
        return coinExchangeRepository.findByStatus(status)
                .stream()
                .map(coinExchangeConverter::toResponseDTO)
                .collect(Collectors.toList());
    }

    // UPDATE STATUS (marcar como resgatado/concluído)
    @Transactional
    public CoinExchangeResponseDTO updateStatus(Long id, String newStatus) {
        CoinExchange exchange = coinExchangeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coin exchange not found with id: " + id));

        exchange.setStatus(newStatus);
        CoinExchange updatedExchange = coinExchangeRepository.save(exchange);
        return coinExchangeConverter.toResponseDTO(updatedExchange);
    }

    // GET TOTAL SPENT BY STUDENT
    public Integer getTotalSpentByStudent(Long studentId) {
        Integer total = coinExchangeRepository.getTotalCoinsSpentByStudent(studentId);
        return total != null ? total : 0;
    }

    // GET COMPLETED EXCHANGES BY COMPANY
    public Long getCompletedExchangesByCompany(Long companyId) {
        return coinExchangeRepository.getCompletedExchangesByCompany(companyId);
    }
}