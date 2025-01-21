// controllers/friendshipsController.js
const { getFriendsByUserId, addFriendship, removeFriendship } = require('../databaseLayer/friendshipsDb');
const { FriendDTO } = require('../DTOs/friendGroupDTOs');

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
        console.log(req.body);
        const userId = req.params.userId;
        const friendEmail = req.body.friendEmail;
        const friendEntity = await addFriendship(userId, friendEmail);
        res.json(FriendDTO.fromEntity(friendEntity));
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
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