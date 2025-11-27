package com.moeda_estudantil.domain.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "empresa")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_fantasia", nullable = false, length = 100)
    private String companyNickname;

    @Column(name = "razao_social", nullable = false, length = 100)
    private String companyName;

    @Column(nullable = false, length = 14, unique = true)
    private String companyDocument;

    @Column(nullable = false, length = 100, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "data_cadastro", nullable = false)
    private LocalDateTime registerDate = LocalDateTime.now();

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private List<Advantage> advantages = new ArrayList<>();

    // Constructors
    public Company() {}

    public Company(Long id, String companyNickname, String companyName, String companyDocument,
                   String email, String password, LocalDateTime registerDate, List<Advantage> advantages) {
        this.id = id;
        this.companyNickname = companyNickname;
        this.companyName = companyName;
        this.companyDocument = companyDocument;
        this.email = email;
        this.password = password;
        this.registerDate = registerDate;
        this.advantages = advantages;
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

    public List<Advantage> getAdvantages() {
        return advantages;
    }

    public void setAdvantages(List<Advantage> advantages) {
        this.advantages = advantages;
    }
}