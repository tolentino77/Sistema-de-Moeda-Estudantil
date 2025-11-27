package com.moeda_estudantil.infrastructure.repositories;

import com.moeda_estudantil.domain.entity.Advantage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdvantageRepository extends JpaRepository<Advantage, Long> {

    List<Advantage> findByCompanyId(Long companyId);

    @Query("SELECT a FROM Advantage a WHERE a.coinCost <= :maxCost ORDER BY a.coinCost ASC")
    List<Advantage> findAffordableAdvantages(@Param("maxCost") Integer maxCost);

    @Query("SELECT a FROM Advantage a WHERE a.company.id = :companyId AND a.coinCost <= :maxCost")
    List<Advantage> findByCompanyAndMaxCost(@Param("companyId") Long companyId,
                                            @Param("maxCost") Integer maxCost);

    @Query("SELECT a FROM Advantage a WHERE LOWER(a.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Advantage> findByNameContainingIgnoreCase(@Param("name") String name);

    @Query("SELECT a FROM Advantage a WHERE a.quantity > 0")
    List<Advantage> findAvailableAdvantages();

    @Modifying
    @Query("UPDATE Advantage a SET a.quantity = a.quantity - 1 WHERE a.id = :advantageId AND a.quantity > 0")
    int decrementQuantity(@Param("advantageId") Long advantageId);

    @Modifying
    @Query("UPDATE Advantage a SET a.quantity = a.quantity + :amount WHERE a.id = :advantageId")
    void incrementQuantity(@Param("advantageId") Long advantageId, @Param("amount") Integer amount);
}