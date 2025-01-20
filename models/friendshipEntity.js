// models/friendshipEntity.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FriendshipEntity = sequelize.define('Friendship', {
    userId1: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userId2: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'friendships',
    timestamps: true
});

FriendshipEntity.associate = (models) => {
    FriendshipEntity.belongsTo(models.UserEntity, {
        foreignKey: 'userId1',
        as: 'user1'
    });
    FriendshipEntity.belongsTo(models.UserEntity, {
        foreignKey: 'userId2',
        as: 'user2'
    });
};

module.exports = FriendshipEntity;