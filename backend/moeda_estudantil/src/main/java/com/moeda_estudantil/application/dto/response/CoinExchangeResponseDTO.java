package com.moeda_estudantil.application.dto.response;

import java.time.LocalDateTime;

public class CoinExchangeResponseDTO {

    private Long id;
    private Long studentId;
    private String studentName;
    private Long advantageId;
    private String advantageName;
    private Integer coinValue;
    private String redemptionCode;
    private String status;
    private String description;
    private LocalDateTime exchangeDate;

    // Constructors
    public CoinExchangeResponseDTO() {}

    public CoinExchangeResponseDTO(Long id, Long studentId, String studentName, Long advantageId,
                                   String advantageName, Integer coinValue, String redemptionCode,
                                   String status, String description, LocalDateTime exchangeDate) {
        this.id = id;
        this.studentId = studentId;
        this.studentName = studentName;
        this.advantageId = advantageId;
        this.advantageName = advantageName;
        this.coinValue = coinValue;
        this.redemptionCode = redemptionCode;
        this.status = status;
        this.description = description;
        this.exchangeDate = exchangeDate;
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

    public Long getAdvantageId() {
        return advantageId;
    }

    public void setAdvantageId(Long advantageId) {
        this.advantageId = advantageId;
    }

    public String getAdvantageName() {
        return advantageName;
    }

    public void setAdvantageName(String advantageName) {
        this.advantageName = advantageName;
    }

    public Integer getCoinValue() {
        return coinValue;
    }

    public void setCoinValue(Integer coinValue) {
        this.coinValue = coinValue;
    }

    public String getRedemptionCode() {
        return redemptionCode;
    }

    public void setRedemptionCode(String redemptionCode) {
        this.redemptionCode = redemptionCode;
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

    public LocalDateTime getExchangeDate() {
        return exchangeDate;
    }

    public void setExchangeDate(LocalDateTime exchangeDate) {
        this.exchangeDate = exchangeDate;
    }
}