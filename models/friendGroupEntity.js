// models/friendGroupEntity.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FriendGroupEntity = sequelize.define('FriendGroup', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: ''
    },
    createdByUserId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    tableName: 'friend_groups',
    timestamps: true
});

FriendGroupEntity.associate = (models) => {
    FriendGroupEntity.belongsTo(models.UserEntity, {
        foreignKey: 'createdByUserId',
        as: 'createdByUser'
    });
    FriendGroupEntity.hasMany(models.FriendGroupUserEntity, {
        foreignKey: 'friendGroupId',
        as: 'groupUsers'
    });
};

FriendGroupEntity.prototype.toDTO = function() {
    const friendGroupUsers = this.groupUsers.map(gu => gu.user.toFriendDTO());
    return {
        id: this.id,
        name: this.name,
        friendGroupUsers: friendGroupUsers
    };
};

module.exports = FriendGroupEntity;