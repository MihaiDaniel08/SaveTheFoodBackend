// controllers/foodsController.js
const { getFoodsByUserId, addFood, claimFood, changeClaimable } = require('../databaseLayer/foodsDb');
const { GetFoodDTO, AddFoodDTO } = require('../dtos/foodDTOs');

const getFoodsByUserIdHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        const foodEntities = await getFoodsByUserId(userId);
        const foodDTOs = foodEntities.map(f => GetFoodDTO.fromEntity(f));
        res.json(foodDTOs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addFoodHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        const foodDTO = new AddFoodDTO(req.body);
        const foodEntity = {
            name: foodDTO.name,
            description: foodDTO.description,
            expirationDate: new Date(foodDTO.expirationDate),
            purchaseDate: new Date(foodDTO.purchaseDate),
            foodCategoryId: foodDTO.foodCategoryId,
            quantity: foodDTO.quantity,
            isClaimable: foodDTO.isClaimable,
            userId: userId
        };
        const foodEntityReturned = await addFood(userId, foodEntity);
        res.json(GetFoodDTO.fromEntity(foodEntityReturned));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const claimFoodHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        const foodId = req.params.foodId;
        const response = await claimFood(userId, foodId);
        res.status(response.status).json({ message: response.message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const changeClaimableHandler = async (req, res) => {
    try {
        const foodId = req.params.foodId;
        const claimable = req.body.claimable;
        const response = await changeClaimable(foodId, claimable);
        res.status(response.status).json({ message: response.message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getFoodsByUserIdHandler,
    addFoodHandler,
    claimFoodHandler,
    changeClaimableHandler
};