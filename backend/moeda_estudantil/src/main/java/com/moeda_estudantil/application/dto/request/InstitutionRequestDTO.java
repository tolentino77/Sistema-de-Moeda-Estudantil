package com.moeda_estudantil.application.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class InstitutionRequestDTO {

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must be less than 100 characters")
    private String name;

    @NotBlank(message = "Company document (CNPJ) is required")
    @Size(min = 14, max = 14, message = "Company document must have 14 digits")
    private String companyDocument;

    @NotBlank(message = "Address is required")
    private String address;

    @Size(max = 100, message = "Contact name must be less than 100 characters")
    private String contactName;

    // Constructors
    public InstitutionRequestDTO() {}

    public InstitutionRequestDTO(String name, String companyDocument, String address, String contactName) {
        this.name = name;
        this.companyDocument = companyDocument;
        this.address = address;
        this.contactName = contactName;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompanyDocument() {
        return companyDocument;
    }

    public void setCompanyDocument(String companyDocument) {
        this.companyDocument = companyDocument;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }
}