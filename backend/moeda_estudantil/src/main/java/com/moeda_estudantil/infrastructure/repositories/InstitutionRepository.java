package com.moeda_estudantil.infrastructure.repositories;

import com.moeda_estudantil.domain.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, Long> {

    Optional<Institution> findByCompanyDocument(String companyDocument);

    boolean existsByCompanyDocument(String companyDocument);

    @Query("SELECT i FROM Institution i WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    Optional<Institution> findByNameContainingIgnoreCase(@Param("name") String name);
}