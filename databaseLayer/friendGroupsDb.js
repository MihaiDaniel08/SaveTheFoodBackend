// databaseLayer/friendGroupsDb.js
const { FriendGroup, FriendGroupUser, User } = require('../models');

const addFriendGroup = async (friendGroup) => {
    return FriendGroup.create(friendGroup);
};

const getFriendGroupsByUserId = async (userId) => {
    return await FriendGroup.findAll({
        where: { createdByUserId: userId },
        include: [{
            model: FriendGroupUser,
            as: 'friendGroupUsers',
            include: [{ model: User, as: 'user' }]
        }]
    });
};

const addUserToFriendGroup = async (groupId, email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    const friendGroup = await FriendGroup.findByPk(groupId, {
        include: [{ model: FriendGroupUser, as: 'friendGroupUsers' }]
    });
    if (!friendGroup) {
        throw new Error('Friend group not found');
    }
    await FriendGroupUser.create({
        userId: user.id,
        friendGroupId: groupId
    });
    return friendGroup;
};

const removeUserFromFriendGroup = async (friendGroupId, userId) => {
    const friendGroup = await FriendGroup.findByPk(friendGroupId, {
        include: [{ model: FriendGroupUser, as: 'friendGroupUsers' }]
    });
    if (!friendGroup) {
        throw new Error('Friend group not found');
    }
    const friendGroupUser = await FriendGroupUser.findOne({
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
    const friendGroup = await FriendGroup.findByPk(id);
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