package com.moeda_estudantil.domain.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vantagem")
public class Advantage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String description;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(name = "custo_moedas", nullable = false)
    private Integer coinCost;

    @Column(name = "foto_url")
    private String photoUrl;

    @Column(name = "imagem_id")
    private String imageId;

    @Column(nullable = false)
    private Integer quantity = 0;

    @Column(name = "data_cadastro")
    private String registerDate;

    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false)
    private Company company;

    @OneToMany(mappedBy = "advantage", cascade = CascadeType.ALL)
    private List<CoinExchange> coinExchanges = new ArrayList<>();

    // Constructors
    public Advantage() {}

    public Advantage(Long id, String description, String name, Integer coinCost, String photoUrl,
                     String imageId, Integer quantity, String registerDate, Company company,
                     List<CoinExchange> coinExchanges) {
        this.id = id;
        this.description = description;
        this.name = name;
        this.coinCost = coinCost;
        this.photoUrl = photoUrl;
        this.imageId = imageId;
        this.quantity = quantity;
        this.registerDate = registerDate;
        this.company = company;
        this.coinExchanges = coinExchanges;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCoinCost() {
        return coinCost;
    }

    public void setCoinCost(Integer coinCost) {
        this.coinCost = coinCost;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(String registerDate) {
        this.registerDate = registerDate;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public List<CoinExchange> getCoinExchanges() {
        return coinExchanges;
    }

    public void setCoinExchanges(List<CoinExchange> coinExchanges) {
        this.coinExchanges = coinExchanges;
    }
}