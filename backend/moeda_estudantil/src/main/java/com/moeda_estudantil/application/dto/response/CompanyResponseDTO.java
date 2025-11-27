package com.moeda_estudantil.application.dto.response;

import java.time.LocalDateTime;

public class CompanyResponseDTO {

    private Long id;
    private String companyNickname;
    private String companyName;
    private String companyDocument;
    private String email;
    private String password; // ADICIONADO para validação de login
    private LocalDateTime registerDate;

    // Constructors
    public CompanyResponseDTO() {}

    public CompanyResponseDTO(Long id, String companyNickname, String companyName, String companyDocument,
                              String email, String password, LocalDateTime registerDate) {
        this.id = id;
        this.companyNickname = companyNickname;
        this.companyName = companyName;
        this.companyDocument = companyDocument;
        this.email = email;
        this.password = password;
        this.registerDate = registerDate;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyNickname() {
        return companyNickname;
    }

    public void setCompanyNickname(String companyNickname) {
        this.companyNickname = companyNickname;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyDocument() {
        return companyDocument;
    }

    public void setCompanyDocument(String companyDocument) {
        this.companyDocument = companyDocument;
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

    public LocalDateTime getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(LocalDateTime registerDate) {
        this.registerDate = registerDate;
    }
}