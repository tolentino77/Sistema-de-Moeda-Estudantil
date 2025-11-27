package com.moeda_estudantil.application.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class AdvantageRequestDTO {

    @NotBlank(message = "Name is required")
    @Size(max = 255, message = "Name must be less than 255 characters")
    private String name;

    @NotBlank(message = "Description is required")
    @Size(max = 100, message = "Description must be less than 100 characters")
    private String description;

    @NotNull(message = "Coin cost is required")
    @Min(value = 1, message = "Coin cost must be at least 1")
    private Integer coinCost;

    private String photoUrl;
    private String imageId;

    @NotNull(message = "Quantity is required")
    @Min(value = 0, message = "Quantity cannot be negative")
    private Integer quantity;

    @NotNull(message = "Company ID is required")
    private Long companyId;

    // Constructors
    public AdvantageRequestDTO() {}

    public AdvantageRequestDTO(String name, String description, Integer coinCost, String photoUrl,
                               String imageId, Integer quantity, Long companyId) {
        this.name = name;
        this.description = description;
        this.coinCost = coinCost;
        this.photoUrl = photoUrl;
        this.imageId = imageId;
        this.quantity = quantity;
        this.companyId = companyId;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getCoinCost() { return coinCost; }
    public void setCoinCost(Integer coinCost) { this.coinCost = coinCost; }

    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }

    public String getImageId() { return imageId; }
    public void setImageId(String imageId) { this.imageId = imageId; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }
}