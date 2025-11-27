package com.moeda_estudantil.application.dto.response;

public class AdvantageResponseDTO {

    private Long id;
    private String name;
    private String description;
    private Integer coinCost;
    private String photoUrl;
    private String imageId;
    private Integer quantity;
    private Long companyId;
    private String companyName;
    private String registerDate;

    // Constructors
    public AdvantageResponseDTO() {}

    public AdvantageResponseDTO(Long id, String name, String description, Integer coinCost, String photoUrl,
                                String imageId, Integer quantity, Long companyId, String companyName, String registerDate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.coinCost = coinCost;
        this.photoUrl = photoUrl;
        this.imageId = imageId;
        this.quantity = quantity;
        this.companyId = companyId;
        this.companyName = companyName;
        this.registerDate = registerDate;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(String registerDate) {
        this.registerDate = registerDate;
    }
}