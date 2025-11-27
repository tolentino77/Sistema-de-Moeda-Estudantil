package com.moeda_estudantil.infrastructure.repositories;

import com.moeda_estudantil.domain.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByEmail(String email);

    Optional<Student> findBySocialId(String socialId);

    Optional<Student> findByDocument(String document);

    boolean existsByEmail(String email);

    boolean existsBySocialId(String socialId);

    boolean existsByDocument(String document);

    List<Student> findByInstitutionId(Long institutionId);

    List<Student> findByCourse(String course);

    @Query("SELECT s FROM Student s WHERE s.institution.id = :institutionId AND s.course = :course")
    List<Student> findByInstitutionAndCourse(@Param("institutionId") Long institutionId,
                                             @Param("course") String course);

    @Query("SELECT s FROM Student s WHERE s.score >= :minBalance")
    List<Student> findStudentsWithMinimumBalance(@Param("minBalance") Integer minBalance);

    @Modifying
    @Query("UPDATE Student s SET s.score = s.score + :amount WHERE s.id = :studentId")
    void addCoins(@Param("studentId") Long studentId, @Param("amount") Integer amount);

    @Modifying
    @Query("UPDATE Student s SET s.score = s.score - :amount WHERE s.id = :studentId AND s.score >= :amount")
    int deductCoins(@Param("studentId") Long studentId, @Param("amount") Integer amount);
}