// models/userEntity.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserEntity = sequelize.define('User', {
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
}, {
    tableName: 'users',
    timestamps: true
});

UserEntity.associate = (models) => {
    UserEntity.hasMany(models.FriendshipEntity, {
        foreignKey: 'userId',
        as: 'friendships'
    });
    UserEntity.hasMany(models.FoodCategoryEntity, {
        foreignKey: 'userId',
        as: 'foodCategories'
    });
    UserEntity.hasMany(models.FoodEntity, {
        foreignKey: 'userId',
        as: 'foods'
    });
};

UserEntity.prototype.toFriendDTO = function() {
    return {
        id: this.id,
        name: this.name,
        email: this.email
    };
};

UserEntity.prototype.toDTO = function() {
    return {
        id: this.id,
        name: this.name,
        email: this.email
    };
};

module.exports = UserEntity;