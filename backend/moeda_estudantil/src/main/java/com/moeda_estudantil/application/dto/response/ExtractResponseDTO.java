package com.moeda_estudantil.application.dto.response;

import java.time.LocalDateTime;

public class ExtractResponseDTO {

    private Long id;
    private String operationType;
    private Integer value;
    private String description;
    private LocalDateTime operationDate;
    private String userName;
    private String userType;

    // Constructors
    public ExtractResponseDTO() {}

    public ExtractResponseDTO(Long id, String operationType, Integer value, String description,
                              LocalDateTime operationDate, String userName, String userType) {
        this.id = id;
        this.operationType = operationType;
        this.value = value;
        this.description = description;
        this.operationDate = operationDate;
        this.userName = userName;
        this.userType = userType;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOperationType() {
        return operationType;
    }

    public void setOperationType(String operationType) {
        this.operationType = operationType;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getOperationDate() {
        return operationDate;
    }

    public void setOperationDate(LocalDateTime operationDate) {
        this.operationDate = operationDate;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}