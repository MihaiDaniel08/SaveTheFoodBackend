// dtos/foodCategoryDTOs.js

class AddFoodCategoryDTO {
    constructor(description, name) {
        this.description = description;
        this.name = name;
    }

    static fromRequest(req) {
        return new AddFoodCategoryDTO(req.description, req.name);
    }
}

class GetFoodCategoryDTO {
    constructor(id, name, description, foods) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.foods = foods; // This should be an array of GetFoodDTO instances
    }

    static fromEntity(entity) {
        return new GetFoodCategoryDTO(entity.id, entity.name, entity.description, entity.foods);
    }
}

module.exports = {
    AddFoodCategoryDTO,
    GetFoodCategoryDTO
};