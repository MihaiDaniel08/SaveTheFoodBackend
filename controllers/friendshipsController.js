// controllers/friendshipsController.js
const { getFriendsByUserId, addFriendship, removeFriendship } = require('../databaseLayer/friendshipsDb');
const { FriendDTO } = require('../dtos/friendGroupDTOs');

const getFriendshipsByUserIdHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        const friendEntities = await getFriendsByUserId(userId);
        const friendDTOs = friendEntities.map(f => FriendDTO.fromEntity(f));
        res.json(friendDTOs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addFriendshipHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        const friendEmail = req.body.email;
        const friendEntity = await addFriendship(userId, friendEmail);
        res.json(FriendDTO.fromEntity(friendEntity));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeFriendshipHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        const friendUserId = req.params.friendUserId;
        const response = await removeFriendship(userId, friendUserId);
        res.status(response.status).json({ message: response.message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getFriendshipsByUserIdHandler,
    addFriendshipHandler,
    removeFriendshipHandler
};