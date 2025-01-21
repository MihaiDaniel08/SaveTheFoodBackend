const Sequelize = require('sequelize');
const db = require('../config/db');

const foodCategoryModel = require('./foodCategoryEntity');
const userModel = require('./userEntity');
const foodModel = require('./foodEntity');
const friendshipModel = require('./friendshipEntity');
const friendGroupModel = require('./friendGroupEntity');
const friendGroupUserModel = require('./friendGroupUserEntity');

const FoodCategory = foodCategoryModel(db, Sequelize);
const User = userModel(db, Sequelize);
const Food = foodModel(db, Sequelize);
const Friendship = friendshipModel(db, Sequelize);
const FriendGroup = friendGroupModel(db, Sequelize);
const FriendGroupUser = friendGroupUserModel(db, Sequelize);


Food.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Food.belongsTo(FoodCategory, { foreignKey: 'foodCategoryId', as: 'foodCategory' });

FoodCategory.belongsTo(User, { foreignKey: 'userId', as: 'user' });
FoodCategory.hasMany(Food, { foreignKey: 'foodCategoryId', as: 'foods' });

Friendship.belongsTo(User, { foreignKey: 'userId1', as: 'user1' });
Friendship.belongsTo(User, { foreignKey: 'userId2', as: 'user2' });

FriendGroup.belongsTo(User, { foreignKey: 'createdByUserId', as: 'createdByUser' });
FriendGroup.hasMany(FriendGroupUser, { foreignKey: 'friendGroupId', as: 'friendGroupUsers' });

FriendGroupUser.belongsTo(FriendGroup, { foreignKey: 'friendGroupId', as: 'friendGroup' });
FriendGroupUser.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(FoodCategory, { foreignKey: 'userId', as: 'foodCategories' });
User.hasMany(Food, { foreignKey: 'userId', as: 'foods' });

const dbModels = {
    sequelize: db,
    Sequelize,
    FoodCategory,
    User,
    Food,
    Friendship,
    FriendGroup,
    FriendGroupUser
};

module.exports = dbModels;