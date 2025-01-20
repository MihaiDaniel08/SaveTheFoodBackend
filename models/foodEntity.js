// models/foodEntity.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FoodEntity = sequelize.define('Food', {
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
        allowNull: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    tableName: 'foods',
    timestamps: true
});

FoodEntity.associate = (models) => {
    FoodEntity.belongsTo(models.UserEntity, {
        foreignKey: 'userId',
        as: 'user'
    });
    models.UserEntity.hasMany(FoodEntity, {
        foreignKey: 'userId',
        as: 'foods'
    });
};

module.exports = FoodEntity;