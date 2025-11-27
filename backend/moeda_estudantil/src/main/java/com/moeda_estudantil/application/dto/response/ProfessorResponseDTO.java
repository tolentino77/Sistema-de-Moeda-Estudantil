package com.moeda_estudantil.application.dto.response;

import java.time.LocalDateTime;

public class ProfessorResponseDTO {

    private Long id;
    private String name;
    private String email;
    private String password; // ADICIONADO para validação de login
    private String socialId;
    private String department;
    private Integer score;
    private Long institutionId;
    private String institutionName;
    private LocalDateTime registerDate;

    // Constructors
    public ProfessorResponseDTO() {}

    public ProfessorResponseDTO(Long id, String name, String email, String password, String socialId,
                                String department, Integer score, Long institutionId,
                                String institutionName, LocalDateTime registerDate) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.socialId = socialId;
        this.department = department;
        this.score = score;
        this.institutionId = institutionId;
        this.institutionName = institutionName;
        this.registerDate = registerDate;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSocialId() {
        return socialId;
    }

    public void setSocialId(String socialId) {
        this.socialId = socialId;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Long getInstitutionId() {
        return institutionId;
    }

    public void setInstitutionId(Long institutionId) {
        this.institutionId = institutionId;
    }

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public LocalDateTime getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(LocalDateTime registerDate) {
        this.registerDate = registerDate;
    }
}