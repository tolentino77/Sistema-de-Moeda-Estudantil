package com.moeda_estudantil.application.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TransactionRequestDTO {

    @NotNull(message = "Student ID is required")
    private Long studentId;

    @NotNull(message = "Professor ID is required")
    private Long professorId;

    @NotNull(message = "Coin value is required")
    @Min(value = 1, message = "Coin value must be at least 1")
    private Integer coinValue;

    @NotBlank(message = "Message is required")
    private String message;

    // Constructors
    public TransactionRequestDTO() {}

    public TransactionRequestDTO(Long studentId, Long professorId, Integer coinValue, String message) {
        this.studentId = studentId;
        this.professorId = professorId;
        this.coinValue = coinValue;
        this.message = message;
    }

    // Getters and Setters
    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getProfessorId() {
        return professorId;
    }

    public void setProfessorId(Long professorId) {
        this.professorId = professorId;
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
}