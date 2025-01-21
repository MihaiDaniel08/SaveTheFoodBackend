const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const userModel = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(50),
                allowNull: false
            }
        },
        {
            tableName: 'users',
            timestamps: true,
            underscored: true,
            freezeTableName: true
        }
    );

    User.associate = (models) => {
        User.hasMany(models.Friendship, {
            foreignKey: 'userId',
            as: 'friendships'
        });
        User.hasMany(models.FoodCategory, {
            foreignKey: 'userId',
            as: 'foodCategories'
        });
        User.hasMany(models.Food, {
            foreignKey: 'userId',
            as: 'foods'
        });
    };

    User.prototype.toFriendDTO = function() {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        };
    };

    User.prototype.toDTO = function() {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        };
    };

    return User;
};

module.exports = userModel;