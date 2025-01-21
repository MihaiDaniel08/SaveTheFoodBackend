// controllers/friendGroupsController.js
const { getFriendGroupsByUserId, addFriendGroup, addUserToFriendGroup, removeUserFromFriendGroup } = require('../databaseLayer/friendGroupsDb');
const { GetFriendGroupDTO, AddFriendGroupDTO } = require('../DTOs/friendGroupDTOs');

const getFriendGroupsByUserIdHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        const friendGroupEntities = await getFriendGroupsByUserId(userId);
        const friendGroupDTOs = friendGroupEntities.map(fg => GetFriendGroupDTO.fromEntity(fg));
        console.log(friendGroupDTOs);
        res.json(friendGroupDTOs);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

const addFriendGroupHandler = async (req, res) => {
    try {
        console.log(req.body);
        const friendGroupDTO = AddFriendGroupDTO.fromRequest(req.body);
        const friendGroupEntity = {
            name: friendGroupDTO.name,
            createdByUserId: friendGroupDTO.userId
        };
        const friendGroupEntityReturned = await addFriendGroup(friendGroupEntity);
        console.log(GetFriendGroupDTO.fromEntity(friendGroupEntityReturned))
        res.json(GetFriendGroupDTO.fromEntity(friendGroupEntityReturned));
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

const addUserToFriendGroupHandler = async (req, res) => {
    try {
        const friendGroupId = req.params.friendGroupId;
        const friendEmail = req.body.friendEmail;
        const friendGroupEntity = await addUserToFriendGroup(friendGroupId, friendEmail);
        res.json(GetFriendGroupDTO.fromEntity(friendGroupEntity));
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

const removeUserFromFriendGroupHandler = async (req, res) => {
    try {
        const friendGroupId = req.params.friendGroupId;
        const userId = req.params.userId;
        const response = await removeUserFromFriendGroup(friendGroupId, userId);
        res.status(response.status).json({ message: response.message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getFriendGroupsByUserIdHandler,
    addFriendGroupHandler,
    addUserToFriendGroupHandler,
    removeUserFromFriendGroupHandler
};