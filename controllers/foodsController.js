// controllers/foodsController.js
const { getFoodsByUserId, addFood, claimFood, changeClaimable } = require('../databaseLayer/foodsDb');
const { GetFoodDTO, AddFoodDTO } = require('../DTOs/foodDTOs');

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
        console.log(userId);
        const foodDTO = AddFoodDTO.fromRequest(req.body);
        console.log(foodDTO);
        const foodEntityReturned = await addFood(userId, foodDTO);
        res.json(GetFoodDTO.fromEntity(foodEntityReturned));
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
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
        const claimable = req.params.claimable;
        const response = await changeClaimable(foodId, claimable);
        res.status(response.status).json({ message: response.message });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

module.exports = {
    getFoodsByUserIdHandler,
    addFoodHandler,
    claimFoodHandler,
    changeClaimableHandler
};