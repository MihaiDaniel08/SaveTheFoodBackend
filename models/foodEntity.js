// models/foodEntity.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const foodModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'Food',
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
                allowNull: false,
                defaultValue: ''
            },
            expirationDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            purchaseDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            isClaimable: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            quantity: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            foodCategoryId: {
                type: DataTypes.UUID,
                allowNull: true // Allow foodCategoryId to be null
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false
            }
        },
        {
            tableName: 'foods',
            timestamps: true,
            underscored: true,
            freezeTableName: true
        }
    );
};

module.exports = foodModel;