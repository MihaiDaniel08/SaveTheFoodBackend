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

    static fromRequest(req) {
        if(req.foodCategoryId === ''){
            req.foodCategoryId = null;
        }
        return new AddFoodDTO(req.name, req.description, req.foodCategoryId, req.expirationDate, req.purchaseDate, req.quantity, req.isClaimable);
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

    static fromEntity(entity) {
        return new GetFoodDTO(entity.id, entity.name, entity.description, entity.foodCategoryId, entity.expirationDate, entity.purchaseDate, entity.quantity, entity.isClaimable);
    }
}

class AddFoodToCategoryDTO {
    constructor(foodId, foodCategoryId) {
        this.foodId = foodId;
        this.foodCategoryId = foodCategoryId;
    }

    static fromRequest(req) {
        return new AddFoodToCategoryDTO(req.foodId, req.foodCategoryId);
    }
}

module.exports = {
    AddFoodDTO,
    GetFoodDTO,
    AddFoodToCategoryDTO
};