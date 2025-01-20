// dtos/foodCategoryDTOs.js

class AddFoodCategoryDTO {
    constructor(description, name) {
        this.description = description;
        this.name = name;
    }
}

class GetFoodCategoryDTO {
    constructor(id, name, description, foods) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.foods = foods; // This should be an array of GetFoodDTO instances
    }
}

module.exports = {
    AddFoodCategoryDTO,
    GetFoodCategoryDTO
};