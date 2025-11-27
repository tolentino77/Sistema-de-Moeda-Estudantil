package com.moeda_estudantil.infrastructure.repositories;

import com.moeda_estudantil.domain.entity.CoinExchange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CoinExchangeRepository extends JpaRepository<CoinExchange, Long> {

    List<CoinExchange> findByStudentId(Long studentId);

    List<CoinExchange> findByAdvantageId(Long advantageId);

    Optional<CoinExchange> findByRescueCode(String redemptionCode);

    List<CoinExchange> findByStatus(String status);

    @Query("SELECT ce FROM CoinExchange ce WHERE ce.student.id = :studentId ORDER BY ce.exchangeDate DESC")
    List<CoinExchange> findByStudentIdOrderByDateDesc(@Param("studentId") Long studentId);

    @Query("SELECT ce FROM CoinExchange ce WHERE ce.advantage.company.id = :companyId ORDER BY ce.exchangeDate DESC")
    List<CoinExchange> findByCompanyIdOrderByDateDesc(@Param("companyId") Long companyId);

    @Query("SELECT ce FROM CoinExchange ce WHERE ce.student.id = :studentId AND ce.status = :status")
    List<CoinExchange> findByStudentIdAndStatus(@Param("studentId") Long studentId,
                                                @Param("status") String status);

    @Query("SELECT ce FROM CoinExchange ce WHERE ce.exchangeDate BETWEEN :startDate AND :endDate")
    List<CoinExchange> findByDateRange(@Param("startDate") LocalDateTime startDate,
                                       @Param("endDate") LocalDateTime endDate);

    @Query("SELECT SUM(ce.coinValue) FROM CoinExchange ce WHERE ce.student.id = :studentId")
    Integer getTotalCoinsSpentByStudent(@Param("studentId") Long studentId);

    @Query("SELECT COUNT(ce) FROM CoinExchange ce WHERE ce.advantage.company.id = :companyId AND ce.status = 'COMPLETED'")
    Long getCompletedExchangesByCompany(@Param("companyId") Long companyId);
}