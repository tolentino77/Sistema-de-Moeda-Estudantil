package com.moeda_estudantil.application.dto.request;

import jakarta.validation.constraints.NotNull;

public class CoinExchangeRequestDTO {

    @NotNull(message = "Student ID is required")
    private Long studentId;

    @NotNull(message = "Advantage ID is required")
    private Long advantageId;

    // Constructors
    public CoinExchangeRequestDTO() {}

    public CoinExchangeRequestDTO(Long studentId, Long advantageId) {
        this.studentId = studentId;
        this.advantageId = advantageId;
    }

    // Getters and Setters
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
}