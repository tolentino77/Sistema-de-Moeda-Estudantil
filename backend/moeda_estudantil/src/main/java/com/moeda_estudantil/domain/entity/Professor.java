package com.moeda_estudantil.domain.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "professor")
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 11, unique = true)
    private String socialId;

    @Column(nullable = false, length = 100)
    private String department;

    @Column(name = "saldo_moedas", nullable = false)
    private Integer score = 0;

    @Column(name = "data_cadastro", nullable = false)
    private LocalDateTime registerDate = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "instituicao_id", nullable = false)
    private Institution institution;

    @OneToMany(mappedBy = "professor", cascade = CascadeType.ALL)
    private List<Transaction> transaction = new ArrayList<>();

    @OneToMany(mappedBy = "professor", cascade = CascadeType.ALL)
    private List<Extract> extracts = new ArrayList<>();

    // Constructors
    public Professor() {}

    public Professor(Long id, String name, String email, String password, String socialId,
                     String department, Integer score, LocalDateTime registerDate,
                     Institution institution, List<Transaction> transaction, List<Extract> extracts) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.socialId = socialId;
        this.department = department;
        this.score = score;
        this.registerDate = registerDate;
        this.institution = institution;
        this.transaction = transaction;
        this.extracts = extracts;
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

    public LocalDateTime getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(LocalDateTime registerDate) {
        this.registerDate = registerDate;
    }

    public Institution getInstitution() {
        return institution;
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
    }

    public List<Transaction> getTransaction() {
        return transaction;
    }

    public void setTransaction(List<Transaction> transaction) {
        this.transaction = transaction;
    }

    public List<Extract> getExtracts() {
        return extracts;
    }

    public void setExtracts(List<Extract> extracts) {
        this.extracts = extracts;
    }
}