// models/foodCategoryEntity.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const foodCategoryModel = (sequelize, DataTypes) => {
    const FoodCategory = sequelize.define(
        'FoodCategory',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(30),
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(100),
                defaultValue: ''
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false
            }
        },
        {
            tableName: 'food_categories',
            timestamps: true,
            underscored: true,
            freezeTableName: true
        }
    );

    FoodCategory.associate = (models) => {
        FoodCategory.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
        models.User.hasMany(FoodCategory, {
            foreignKey: 'userId',
            as: 'foodCategories'
        });
        FoodCategory.hasMany(models.Food, {
            foreignKey: 'foodCategoryId',
            as: 'foods'
        });
    };

    return FoodCategory;
};

module.exports = foodCategoryModel;