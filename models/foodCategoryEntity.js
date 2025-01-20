// models/foodCategoryEntity.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FoodCategoryEntity = sequelize.define('FoodCategory', {
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
}, {
    tableName: 'food_categories',
    timestamps: true
});

FoodCategoryEntity.associate = (models) => {
    FoodCategoryEntity.belongsTo(models.UserEntity, {
        foreignKey: 'userId',
        as: 'user'
    });
    models.UserEntity.hasMany(FoodCategoryEntity, {
        foreignKey: 'userId',
        as: 'foodCategories'
    });
};

module.exports = FoodCategoryEntity;