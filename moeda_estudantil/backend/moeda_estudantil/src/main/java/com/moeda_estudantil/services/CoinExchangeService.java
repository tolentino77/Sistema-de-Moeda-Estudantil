package com.moeda_estudantil.services;

import com.moeda_estudantil.application.dto.request.CoinExchangeRequestDTO;
import com.moeda_estudantil.application.dto.response.AdvantageResponseDTO;
import com.moeda_estudantil.application.dto.response.CoinExchangeResponseDTO;
import com.moeda_estudantil.domain.entity.CoinExchange;
import com.moeda_estudantil.domain.converter.CoinExchangeConverter;
import com.moeda_estudantil.infrastructure.repositories.CoinExchangeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CoinExchangeService {

    @Autowired
    private CoinExchangeRepository coinExchangeRepository;

    @Autowired
    private CoinExchangeConverter coinExchangeConverter;

    @Autowired
    private StudentService studentService;

    @Autowired
    private AdvantageService advantageService;

    // CREATE (Aluno troca moedas por vantagem)
    @Transactional
    public CoinExchangeResponseDTO create(CoinExchangeRequestDTO dto) {
        // Buscar vantagem
        AdvantageResponseDTO advantage = advantageService.findById(dto.getAdvantageId());

        // Validar estoque
        if (advantage.getQuantity() <= 0) {
            throw new RuntimeException("Advantage out of stock");
        }

        // Validar saldo do aluno
        Integer studentBalance = studentService.getBalance(dto.getStudentId());
        if (studentBalance < advantage.getCoinCost()) {
            throw new RuntimeException("Insufficient coins balance");
        }

        // Deduzir moedas do aluno
        boolean deducted = studentService.deductCoins(dto.getStudentId(), advantage.getCoinCost());
        if (!deducted) {
            throw new RuntimeException("Failed to deduct coins from student");
        }

        // Decrementar quantidade da vantagem
        boolean decremented = advantageService.decrementQuantity(dto.getAdvantageId());
        if (!decremented) {
            throw new RuntimeException("Failed to decrement advantage quantity");
        }

        // Criar troca
        CoinExchange exchange = coinExchangeConverter.toEntity(dto);
        exchange.setCoinValue(advantage.getCoinCost());
        exchange.setDescription(advantage.getName() + " - " + advantage.getDescription());

        CoinExchange savedExchange = coinExchangeRepository.save(exchange);

        // TODO: Enviar email com cupom para aluno
        // TODO: Enviar email para empresa parceira

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