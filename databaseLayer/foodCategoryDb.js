// databaseLayer/foodCategoryDb.js
const { Op } = require('sequelize');
const { FoodCategoryEntity, FoodEntity } = require('../models');

const getFoodCategoriesByUserId = async (userId) => {
    return await FoodCategoryEntity.findAll({
        where: { userId },
        include: [{ model: FoodEntity, as: 'foods' }]
    });
};

const getFoodsWithoutCategory = async (userId) => {
    return await FoodEntity.findAll({
        where: {
            userId,
            foodCategoryId: { [Op.is]: null }
        }
    });
};

const addFoodCategory = async (userId, foodCategory) => {
    foodCategory.userId = userId;
    return FoodCategoryEntity.create(foodCategory);
};

const addFoodToCategory = async (foodCategoryId, foodId) => {
    const food = await FoodEntity.findByPk(foodId);
    if (!food) {
        return { status: 404, message: 'Food not found' };
    }
    const foodCategory = await FoodCategoryEntity.findByPk(foodCategoryId, {
        include: [{ model: FoodEntity, as: 'foods' }]
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