package com.moeda_estudantil.application.dto.response;

import java.time.LocalDateTime;

public class StudentResponseDTO {

    private Long id;
    private String name;
    private String email;
    private String password; // ADICIONADO para validação de login
    private String socialId;
    private String document;
    private String address;
    private String course;
    private Integer score;
    private Long institutionId;
    private String institutionName;
    private LocalDateTime registerDate;

    // Constructors
    public StudentResponseDTO() {}

    public StudentResponseDTO(Long id, String name, String email, String password, String socialId,
                              String document, String address, String course, Integer score,
                              Long institutionId, String institutionName, LocalDateTime registerDate) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.socialId = socialId;
        this.document = document;
        this.address = address;
        this.course = course;
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

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
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