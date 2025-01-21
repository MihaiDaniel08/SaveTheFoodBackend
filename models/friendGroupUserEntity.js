const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const friendGroupUserModel = (sequelize, DataTypes) => {
    const FriendGroupUser = sequelize.define(
        'FriendGroupUser',
        {
            friendGroupId: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            userId: {
                type: DataTypes.UUID,
                primaryKey: true
            }
        },
        {
            tableName: 'friend_group_users',
            timestamps: true,
            underscored: true,
            freezeTableName: true
        }
    );

    // FriendGroupUser.associate = (models) => {
    //     FriendGroupUser.belongsTo(models.FriendGroup, {
    //         foreignKey: 'friendGroupId',
    //         as: 'friendGroup'
    //     });
    //     FriendGroupUser.belongsTo(models.User, {
    //         foreignKey: 'userId',
    //         as: 'user'
    //     });
    // };

    return FriendGroupUser;
};

module.exports = friendGroupUserModel;