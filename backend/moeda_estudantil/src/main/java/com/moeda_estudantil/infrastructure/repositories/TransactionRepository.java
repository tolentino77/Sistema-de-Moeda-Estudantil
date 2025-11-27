package com.moeda_estudantil.infrastructure.repositories;

import com.moeda_estudantil.domain.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByStudentId(Long studentId);

    List<Transaction> findByProfessorId(Long professorId);

    @Query("SELECT t FROM Transaction t WHERE t.student.id = :studentId ORDER BY t.transactionDate DESC")
    List<Transaction> findByStudentIdOrderByDateDesc(@Param("studentId") Long studentId);

    @Query("SELECT t FROM Transaction t WHERE t.professor.id = :professorId ORDER BY t.transactionDate DESC")
    List<Transaction> findByProfessorIdOrderByDateDesc(@Param("professorId") Long professorId);

    @Query("SELECT t FROM Transaction t WHERE t.student.id = :studentId AND t.transactionDate BETWEEN :startDate AND :endDate")
    List<Transaction> findByStudentAndDateRange(@Param("studentId") Long studentId,
                                                @Param("startDate") LocalDateTime startDate,
                                                @Param("endDate") LocalDateTime endDate);

    @Query("SELECT t FROM Transaction t WHERE t.professor.id = :professorId AND t.transactionDate BETWEEN :startDate AND :endDate")
    List<Transaction> findByProfessorAndDateRange(@Param("professorId") Long professorId,
                                                  @Param("startDate") LocalDateTime startDate,
                                                  @Param("endDate") LocalDateTime endDate);

    @Query("SELECT SUM(t.coinValue) FROM Transaction t WHERE t.professor.id = :professorId")
    Integer getTotalCoinsSentByProfessor(@Param("professorId") Long professorId);

    @Query("SELECT SUM(t.coinValue) FROM Transaction t WHERE t.student.id = :studentId")
    Integer getTotalCoinsReceivedByStudent(@Param("studentId") Long studentId);
}