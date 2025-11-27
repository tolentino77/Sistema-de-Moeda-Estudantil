package com.moeda_estudantil.application.dto.response;

import java.time.LocalDateTime;

public class TransactionResponseDTO {

    private Long id;
    private Long studentId;
    private String studentName;
    private Long professorId;
    private String professorName;
    private Integer coinValue;
    private String message;
    private LocalDateTime transactionDate;

    // Constructors
    public TransactionResponseDTO() {}

    public TransactionResponseDTO(Long id, Long studentId, String studentName, Long professorId,
                                  String professorName, Integer coinValue, String message, LocalDateTime transactionDate) {
        this.id = id;
        this.studentId = studentId;
        this.studentName = studentName;
        this.professorId = professorId;
        this.professorName = professorName;
        this.coinValue = coinValue;
        this.message = message;
        this.transactionDate = transactionDate;
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

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public Long getProfessorId() {
        return professorId;
    }

    public void setProfessorId(Long professorId) {
        this.professorId = professorId;
    }

    public String getProfessorName() {
        return professorName;
    }

    public void setProfessorName(String professorName) {
        this.professorName = professorName;
    }

    public Integer getCoinValue() {
        return coinValue;
    }

    public void setCoinValue(Integer coinValue) {
        this.coinValue = coinValue;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }
}