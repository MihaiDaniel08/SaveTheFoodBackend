// databaseLayer/friendshipsDb.js
const { UserEntity, FriendshipEntity } = require('../models');
const {Op} = require("sequelize");

const getFriendsByUserId = async (userId) => {
    const friendships = await FriendshipEntity.findAll({
        where: {
            [Op.or]: [
                { userId1: userId },
                { userId2: userId }
            ],
            active: true
        },
        include: [
            { model: UserEntity, as: 'user1' },
            { model: UserEntity, as: 'user2' }
        ]
    });

    return friendships.map(f => f.userId1 === userId ? f.user2 : f.user1);
};

const addFriendship = async (userId, friendEmail) => {
    const friend = await UserEntity.findOne({ where: { email: friendEmail } });
    if (!friend) {
        throw new Error('Friend not found');
    }
    const friendship = await FriendshipEntity.create({
        userId1: userId,
        userId2: friend.id,
        active: true
    });
    return friend;
};

const removeFriendship = async (userId1, userId2) => {
    const friendship = await FriendshipEntity.findOne({
        where: {
            [Op.or]: [
                { userId1, userId2 },
                { userId1: userId2, userId2: userId1 }
            ]
        }
    });
    if (!friendship) {
        return { status: 404, message: 'Friendship not found' };
    }
    friendship.active = false;
    await friendship.save();
    return { status: 200, message: 'Friendship removed successfully' };
};

module.exports = {
    getFriendsByUserId,
    addFriendship,
    removeFriendship
};