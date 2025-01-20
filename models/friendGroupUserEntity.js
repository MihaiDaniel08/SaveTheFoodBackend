// models/friendGroupUserEntity.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FriendGroupUserEntity = sequelize.define('FriendGroupUser', {
    friendGroupId: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        primaryKey: true
    }
}, {
    tableName: 'friend_group_users',
    timestamps: true
});

FriendGroupUserEntity.associate = (models) => {
    FriendGroupUserEntity.belongsTo(models.FriendGroupEntity, {
        foreignKey: 'friendGroupId',
        as: 'friendGroup'
    });
    FriendGroupUserEntity.belongsTo(models.UserEntity, {
        foreignKey: 'userId',
        as: 'user'
    });
};

module.exports = FriendGroupUserEntity;