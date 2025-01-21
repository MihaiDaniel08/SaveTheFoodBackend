const express = require('express');
const router = express.Router();
const foodCategoriesController = require('../controllers/foodCategoriesController');
const friendGroupsController = require('../controllers/friendGroupsController');
const usersController = require('../controllers/usersController');
const foodsController = require('../controllers/foodsController');
const friendshipsController = require('../controllers/friendshipsController');

// Food Categories routes
router.get('/foodcategories/:userId', foodCategoriesController.getFoodCategoriesByUserIdHandler);
router.post('/foodcategories/:userId', foodCategoriesController.addFoodCategoryHandler);
router.get('/foodswithoutcategory/:userId', foodCategoriesController.getFoodsWithoutCategoryHandler);
router.post('/addfoodtocategory', foodCategoriesController.addFoodToCategoryHandler);

// Friend Groups routes
router.post('/friendgroups', friendGroupsController.addFriendGroupHandler);
router.get('/friendgroups/:userId', friendGroupsController.getFriendGroupsByUserIdHandler);
router.post('/friendgroups/:friendGroupId', friendGroupsController.addUserToFriendGroupHandler);
router.delete('/friendgroups/:friendGroupId/:userId', friendGroupsController.removeUserFromFriendGroupHandler);

// Users routes
router.get('/users/:id', usersController.getUserByIdHandler);
router.post('/users', usersController.addUserHandler);
router.put('/users/:id', usersController.updateUserHandler);
router.delete('/users/:id', usersController.deleteUserHandler);
router.post('/users/login', usersController.loginUserHandler);

// Food Items routes
router.post('/fooditems/:userId', foodsController.addFoodHandler);
router.get('/fooditems/:userId', foodsController.getFoodsByUserIdHandler);
router.post('/fooditems/:foodId/claim', foodsController.claimFoodHandler);
router.patch('/fooditems/:foodId/:claimable', foodsController.changeClaimableHandler);

// Friendships routes
router.get('/friends/:userId', friendshipsController.getFriendshipsByUserIdHandler);
router.post('/friends/:userId', friendshipsController.addFriendshipHandler);
router.delete('/friends/:userId/:friendId', friendshipsController.removeFriendshipHandler);

module.exports = router;