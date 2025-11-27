package com.moeda_estudantil.application.dto.response;

public class InstitutionResponseDTO {

    private Long id;
    private String name;
    private String companyDocument;
    private String address;
    private String contactName;

    // Constructors
    public InstitutionResponseDTO() {}

    public InstitutionResponseDTO(Long id, String name, String companyDocument, String address, String contactName) {
        this.id = id;
        this.name = name;
        this.companyDocument = companyDocument;
        this.address = address;
        this.contactName = contactName;
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