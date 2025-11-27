package com.moeda_estudantil.infrastructure.repositories;

import com.moeda_estudantil.domain.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    Optional<Company> findByEmail(String email);

    Optional<Company> findByCompanyDocument(String companyDocument);

    boolean existsByEmail(String email);

    boolean existsByCompanyDocument(String companyDocument);

    @Query("SELECT c FROM Company c WHERE LOWER(c.companyNickname) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Company> findByTradeNameContainingIgnoreCase(@Param("name") String name);

    @Query("SELECT c FROM Company c WHERE LOWER(c.companyName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Company> findByLegalNameContainingIgnoreCase(@Param("name") String name);
}