// controllers/foodCategoriesController.js
const { getFoodCategoriesByUserId, getFoodsWithoutCategory, addFoodCategory, addFoodToCategory } = require('../databaseLayer/foodCategoryDb');
const { GetFoodCategoryDTO, AddFoodCategoryDTO } = require('../DTOs/foodCategoryDTOs');
const { GetFoodDTO, AddFoodToCategoryDTO } = require('../DTOs/foodDTOs');

const getFoodCategoriesByUserIdHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        const foodCategories = await getFoodCategoriesByUserId(userId);
        const foodCategoriesDTO = foodCategories.map(fc => GetFoodCategoryDTO.fromEntity(fc));
        console.log(foodCategoriesDTO);
        res.json(foodCategoriesDTO);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

const getFoodsWithoutCategoryHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        const foods = await getFoodsWithoutCategory(userId);
        const foodDTOs = foods.map(f => GetFoodDTO.fromEntity(f));
        console.log(foodDTOs);
        res.json(foodDTOs);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

const addFoodCategoryHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(userId);
        console.log(req.body);
        const foodCategoryDTO = AddFoodCategoryDTO.fromRequest(req.body);
        const foodCategoryEntity = {
            name: foodCategoryDTO.name,
            description: foodCategoryDTO.description,
            userId: userId
        };
        const foodCategoryEntityReturned = await addFoodCategory(userId, foodCategoryEntity);
        console.log(GetFoodCategoryDTO.fromEntity(foodCategoryEntityReturned));
        res.json(GetFoodCategoryDTO.fromEntity(foodCategoryEntityReturned));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addFoodToCategoryHandler = async (req, res) => {
    try {
        console.log(req.body);
        const addFoodToCategoryDTO = AddFoodToCategoryDTO.fromRequest(req.body);
        const response = await addFoodToCategory(addFoodToCategoryDTO.foodCategoryId, addFoodToCategoryDTO.foodId);
        res.status(response.status).json({ message: response.message });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

module.exports = {
    getFoodCategoriesByUserIdHandler,
    getFoodsWithoutCategoryHandler,
    addFoodCategoryHandler,
    addFoodToCategoryHandler
};