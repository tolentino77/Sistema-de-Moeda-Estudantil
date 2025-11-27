package com.moeda_estudantil.domain.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "troca_moeda")
public class CoinExchange {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "aluno_id", insertable = false, updatable = false)
    private Long studentId;

    @Column(name = "vantagem_id", insertable = false, updatable = false)
    private Long advantageId;

    @Column(name = "valor_moedas", nullable = false)
    private Integer coinValue;

    @Column(name = "data_troca", nullable = false)
    private LocalDateTime exchangeDate = LocalDateTime.now();

    @Column(name = "codigo_resgate", nullable = false, unique = true, length = 50)
    private String rescueCode;

    @Column(nullable = false, length = 20)
    private String status = "PENDENTE";

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "aluno_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "vantagem_id", nullable = false)
    private Advantage advantage;

    // Constructors
    public CoinExchange() {}

    public CoinExchange(Long id, Long studentId, Long advantageId, Integer coinValue,
                        LocalDateTime exchangeDate, String rescueCode, String status,
                        String description, Student student, Advantage advantage) {
        this.id = id;
        this.studentId = studentId;
        this.advantageId = advantageId;
        this.coinValue = coinValue;
        this.exchangeDate = exchangeDate;
        this.rescueCode = rescueCode;
        this.status = status;
        this.description = description;
        this.student = student;
        this.advantage = advantage;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getAdvantageId() {
        return advantageId;
    }

    public void setAdvantageId(Long advantageId) {
        this.advantageId = advantageId;
    }

    public Integer getCoinValue() {
        return coinValue;
    }

    public void setCoinValue(Integer coinValue) {
        this.coinValue = coinValue;
    }

    public LocalDateTime getExchangeDate() {
        return exchangeDate;
    }

    public void setExchangeDate(LocalDateTime exchangeDate) {
        this.exchangeDate = exchangeDate;
    }

    public String getRescueCode() {
        return rescueCode;
    }

    public void setRescueCode(String rescueCode) {
        this.rescueCode = rescueCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Advantage getAdvantage() {
        return advantage;
    }

    public void setAdvantage(Advantage advantage) {
        this.advantage = advantage;
    }
}