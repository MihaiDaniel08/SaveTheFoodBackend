const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const friendGroupModel = (sequelize, DataTypes) => {
    const FriendGroup = sequelize.define(
        'FriendGroup',
        {
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
        },
        {
            tableName: 'friend_groups',
            timestamps: true,
            underscored: true,
            freezeTableName: true
        }
    );

    // FriendGroup.associate = (models) => {
    //     FriendGroup.belongsTo(models.User, {
    //         foreignKey: 'createdByUserId',
    //         as: 'createdByUser'
    //     });
    //     FriendGroup.hasMany(models.FriendGroupUser, {
    //         foreignKey: 'friendGroupId',
    //         as: 'groupUsers'
    //     });
    // };

    FriendGroup.prototype.toDTO = function() {
        const friendGroupUsers = this.groupUsers.map(gu => gu.user.toFriendDTO());
        return {
            id: this.id,
            name: this.name,
            friendGroupUsers: friendGroupUsers
        };
    };

    return FriendGroup;
};

module.exports = friendGroupModel;