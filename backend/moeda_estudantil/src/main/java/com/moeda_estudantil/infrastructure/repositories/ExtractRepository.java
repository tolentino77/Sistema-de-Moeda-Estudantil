package com.moeda_estudantil.infrastructure.repositories;

import com.moeda_estudantil.domain.entity.Extract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExtractRepository extends JpaRepository<Extract, Long> {

    List<Extract> findByStudentId(Long studentId);

    List<Extract> findByProfessorId(Long professorId);

    List<Extract> findByOperationType(String operationType);

    @Query("SELECT e FROM Extract e WHERE e.student.id = :studentId ORDER BY e.operationDate DESC")
    List<Extract> findByStudentIdOrderByDateDesc(@Param("studentId") Long studentId);

    @Query("SELECT e FROM Extract e WHERE e.professor.id = :professorId ORDER BY e.operationDate DESC")
    List<Extract> findByProfessorIdOrderByDateDesc(@Param("professorId") Long professorId);

    @Query("SELECT e FROM Extract e WHERE e.student.id = :studentId AND e.operationType = :operationType")
    List<Extract> findByStudentIdAndOperationType(@Param("studentId") Long studentId,
                                                  @Param("operationType") String operationType);

    @Query("SELECT e FROM Extract e WHERE e.professor.id = :professorId AND e.operationType = :operationType")
    List<Extract> findByProfessorIdAndOperationType(@Param("professorId") Long professorId,
                                                    @Param("operationType") String operationType);

    @Query("SELECT e FROM Extract e WHERE e.student.id = :studentId AND e.operationDate BETWEEN :startDate AND :endDate")
    List<Extract> findByStudentIdAndDateRange(@Param("studentId") Long studentId,
                                              @Param("startDate") LocalDateTime startDate,
                                              @Param("endDate") LocalDateTime endDate);

    @Query("SELECT e FROM Extract e WHERE e.professor.id = :professorId AND e.operationDate BETWEEN :startDate AND :endDate")
    List<Extract> findByProfessorIdAndDateRange(@Param("professorId") Long professorId,
                                                @Param("startDate") LocalDateTime startDate,
                                                @Param("endDate") LocalDateTime endDate);
}