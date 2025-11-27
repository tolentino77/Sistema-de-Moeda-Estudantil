package com.moeda_estudantil.application.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ProfessorRequestDTO {

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must be less than 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "Social ID (CPF) is required")
    @Size(min = 11, max = 11, message = "Social ID must have 11 digits")
    private String socialId;

    @NotBlank(message = "Department is required")
    @Size(max = 100, message = "Department must be less than 100 characters")
    private String department;

    @NotNull(message = "Institution ID is required")
    private Long institutionId;

    // Constructors
    public ProfessorRequestDTO() {}

    public ProfessorRequestDTO(String name, String email, String password, String socialId,
                               String department, Long institutionId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.socialId = socialId;
        this.department = department;
        this.institutionId = institutionId;
    }

    // Getters and Setters
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

    public Long getInstitutionId() {
        return institutionId;
    }

    public void setInstitutionId(Long institutionId) {
        this.institutionId = institutionId;
    }
}