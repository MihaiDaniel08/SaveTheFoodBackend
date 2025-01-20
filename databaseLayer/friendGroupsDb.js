// databaseLayer/friendGroupsDb.js
const { FriendGroupEntity, FriendGroupUserEntity, UserEntity } = require('../models');
const { Op } = require('sequelize');

const addFriendGroup = async (friendGroup) => {
    return FriendGroupEntity.create(friendGroup);
};

const getFriendGroupsByUserId = async (userId) => {
    return await FriendGroupEntity.findAll({
        where: { createdByUserId: userId },
        include: [{
            model: FriendGroupUserEntity,
            as: 'groupUsers',
            include: [{ model: UserEntity, as: 'user' }]
        }]
    });
};

const addUserToFriendGroup = async (groupId, email) => {
    const user = await UserEntity.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    const friendGroup = await FriendGroupEntity.findByPk(groupId, {
        include: [{ model: FriendGroupUserEntity, as: 'groupUsers' }]
    });
    if (!friendGroup) {
        throw new Error('Friend group not found');
    }
    await FriendGroupUserEntity.create({
        userId: user.id,
        friendGroupId: groupId
    });
    return friendGroup;
};

const removeUserFromFriendGroup = async (friendGroupId, userId) => {
    const friendGroup = await FriendGroupEntity.findByPk(friendGroupId, {
        include: [{ model: FriendGroupUserEntity, as: 'groupUsers' }]
    });
    if (!friendGroup) {
        throw new Error('Friend group not found');
    }
    const friendGroupUser = await FriendGroupUserEntity.findOne({
        where: {
            friendGroupId,
            userId
        }
    });
    if (!friendGroupUser) {
        throw new Error('User not found in friend group');
    }
    await friendGroupUser.destroy();
    return { status: 200, message: 'User removed from friend group' };
};

const deleteFriendGroup = async (id) => {
    const friendGroup = await FriendGroupEntity.findByPk(id);
    if (!friendGroup) {
        return null;
    }
    await friendGroup.destroy();
    return friendGroup;
};

module.exports = {
    addFriendGroup,
    getFriendGroupsByUserId,
    addUserToFriendGroup,
    removeUserFromFriendGroup,
    deleteFriendGroup
};