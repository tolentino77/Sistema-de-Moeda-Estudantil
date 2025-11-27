package com.moeda_estudantil.infrastructure.repositories;

import com.moeda_estudantil.domain.entity.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {

    Optional<Professor> findByEmail(String email);

    Optional<Professor> findBySocialId(String socialId);

    boolean existsByEmail(String email);

    boolean existsBySocialId(String socialId);

    List<Professor> findByInstitutionId(Long institutionId);

    List<Professor> findByDepartment(String department);

    @Query("SELECT p FROM Professor p WHERE p.institution.id = :institutionId AND p.department = :department")
    List<Professor> findByInstitutionAndDepartment(@Param("institutionId") Long institutionId,
                                                   @Param("department") String department);

    @Modifying
    @Query("UPDATE Professor p SET p.score = p.score + :amount WHERE p.id = :professorId")
    void addCoins(@Param("professorId") Long professorId, @Param("amount") Integer amount);

    @Modifying
    @Query("UPDATE Professor p SET p.score = p.score - :amount WHERE p.id = :professorId AND p.score >= :amount")
    int deductCoins(@Param("professorId") Long professorId, @Param("amount") Integer amount);
}