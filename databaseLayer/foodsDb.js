// databaseLayer/foodsDb.js
const { FoodEntity } = require('../models');

const getFoodsByUserId = async (userId) => {
    return await FoodEntity.findAll({
        where: {
            userId,
            foodCategoryId: null
        }
    });
};

const addFood = async (userId, food) => {
    food.userId = userId;
    return FoodEntity.create(food);
};

const claimFood = async (userId, foodId) => {
    const food = await FoodEntity.findOne({
        where: {
            id: foodId,
            userId
        }
    });
    if (!food) {
        return { status: 404, message: 'Food not found' };
    }
    food.userId = userId;
    await food.save();
    return { status: 200, message: 'Food claimed successfully' };
};

const changeClaimable = async (foodId, claimable) => {
    const food = await FoodEntity.findByPk(foodId);
    if (!food) {
        return { status: 404, message: 'Food not found' };
    }
    food.isClaimable = claimable;
    await food.save();
    return { status: 200, message: 'Food claimable status updated' };
};

module.exports = {
    getFoodsByUserId,
    addFood,
    claimFood,
    changeClaimable
};