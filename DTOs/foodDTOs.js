// dtos/foodDTOs.js

class AddFoodDTO {
    constructor(name, description, foodCategoryId, expirationDate, purchaseDate, quantity, isClaimable) {
        this.name = name;
        this.description = description;
        this.foodCategoryId = foodCategoryId;
        this.expirationDate = expirationDate;
        this.purchaseDate = purchaseDate;
        this.quantity = quantity;
        this.isClaimable = isClaimable;
    }
}

class GetFoodDTO {
    constructor(id, name, description, foodCategoryId, expirationDate, purchaseDate, quantity, isClaimable) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.foodCategoryId = foodCategoryId;
        this.expirationDate = expirationDate;
        this.purchaseDate = purchaseDate;
        this.quantity = quantity;
        this.isClaimable = isClaimable;
    }
}

class AddFoodToCategoryDTO {
    constructor(foodId, foodCategoryId) {
        this.foodId = foodId;
        this.foodCategoryId = foodCategoryId;
    }
}

module.exports = {
    AddFoodDTO,
    GetFoodDTO,
    AddFoodToCategoryDTO
};