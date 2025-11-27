package com.moeda_estudantil.domain.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "institution")
public class Institution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 14, unique = true)
    private String companyDocument;

    @Column(nullable = false)
    private String address;

    @Column(name = "nome_contato", length = 100)
    private String contactName;

    @OneToMany(mappedBy = "institution", cascade = CascadeType.ALL)
    private List<Professor> professors = new ArrayList<>();

    @OneToMany(mappedBy = "institution", cascade = CascadeType.ALL)
    private List<Student> students = new ArrayList<>();

    // Constructors
    public Institution() {}

    public Institution(Long id, String name, String companyDocument, String address,
                       String contactName, List<Professor> professors, List<Student> students) {
        this.id = id;
        this.name = name;
        this.companyDocument = companyDocument;
        this.address = address;
        this.contactName = contactName;
        this.professors = professors;
        this.students = students;
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

    public List<Professor> getProfessors() {
        return professors;
    }

    public void setProfessors(List<Professor> professors) {
        this.professors = professors;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }
}