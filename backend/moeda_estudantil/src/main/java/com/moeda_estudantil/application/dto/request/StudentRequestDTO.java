package com.moeda_estudantil.application.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class StudentRequestDTO {

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

    @NotBlank(message = "Document (RG) is required")
    @Size(max = 20, message = "Document must be less than 20 characters")
    private String document;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Course is required")
    @Size(max = 100, message = "Course must be less than 100 characters")
    private String course;

    @NotNull(message = "Institution ID is required")
    private Long institutionId;

    // Constructors
    public StudentRequestDTO() {}

    public StudentRequestDTO(String name, String email, String password, String socialId,
                             String document, String address, String course, Long institutionId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.socialId = socialId;
        this.document = document;
        this.address = address;
        this.course = course;
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

    public Long getInstitutionId() {
        return institutionId;
    }

    public void setInstitutionId(Long institutionId) {
        this.institutionId = institutionId;
    }
}