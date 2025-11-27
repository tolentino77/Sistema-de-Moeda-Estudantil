package com.moeda_estudantil.application.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CompanyRequestDTO {

    @NotBlank(message = "Company nickname is required")
    @Size(max = 100, message = "Company nickname must be less than 100 characters")
    private String companyNickname;

    @NotBlank(message = "Company name is required")
    @Size(max = 100, message = "Company name must be less than 100 characters")
    private String companyName;

    @NotBlank(message = "Company document (CNPJ) is required")
    @Size(min = 14, max = 14, message = "Company document must have 14 digits")
    private String companyDocument;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    // Constructors
    public CompanyRequestDTO() {}

    public CompanyRequestDTO(String companyNickname, String companyName, String companyDocument,
                             String email, String password) {
        this.companyNickname = companyNickname;
        this.companyName = companyName;
        this.companyDocument = companyDocument;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
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
}