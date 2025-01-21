// databaseLayer/foodCategoryDb.js
const { Op } = require('sequelize');
const { FoodCategory, Food } = require('../models');

const getFoodCategoriesByUserId = async (userId) => {
    return await FoodCategory.findAll({
        where: { userId },
        include: [{ model: Food, as: 'foods' }]
    });
};

const getFoodsWithoutCategory = async (userId) => {
    return await Food.findAll({
        where: {
            userId,
            foodCategoryId: { [Op.is]: null }
        }
    });
};

const addFoodCategory = async (userId, foodCategory) => {
    foodCategory.userId = userId;
    return FoodCategory.create(foodCategory);
};

const addFoodToCategory = async (foodCategoryId, foodId) => {
    const food = await Food.findByPk(foodId);
    if (!food) {
        return { status: 404, message: 'Food not found' };
    }
    const foodCategory = await FoodCategory.findByPk(foodCategoryId, {
        include: [{ model: Food, as: 'foods' }]
    });
    if (!foodCategory) {
        return { status: 404, message: 'Food category not found' };
    }
    await foodCategory.addFood(food);
    return { status: 200, message: 'Food added to category' };
};

module.exports = {
    getFoodCategoriesByUserId,
    getFoodsWithoutCategory,
    addFoodCategory,
    addFoodToCategory
};