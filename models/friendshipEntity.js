const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const friendshipModel = (sequelize, DataTypes) => {
    const Friendship = sequelize.define(
        'Friendship',
        {
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
        },
        {
            tableName: 'friendships',
            timestamps: true,
            underscored: true,
            freezeTableName: true
        }
    );

    Friendship.associate = (models) => {
        Friendship.belongsTo(models.User, {
            foreignKey: 'userId1',
            as: 'user1'
        });
        Friendship.belongsTo(models.User, {
            foreignKey: 'userId2',
            as: 'user2'
        });
    };

    return Friendship;
};

module.exports = friendshipModel;