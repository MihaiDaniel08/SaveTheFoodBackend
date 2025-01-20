// databaseLayer/usersDb.js
const { UserEntity } = require('../models');

const getUserByEmail = async (email) => {
    return await UserEntity.findOne({ where: { email } });
};

const getUserById = async (id) => {
    const user = await UserEntity.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const addUser = async (user) => {
    return UserEntity.create(user);
};

const updateUser = async (user) => {
    const [updated] = await UserEntity.update(user, {
        where: { id: user.id }
    });
    if (!updated) {
        throw new Error('User not found');
    }
    return await UserEntity.findByPk(user.id);
};

const deleteUser = async (id) => {
    const user = await UserEntity.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }
    await user.destroy();
    return user;
};

const authenticateUser = async (email, password) => {
    return await UserEntity.findOne({ where: { email, password } });
};

const isEmailInUse = async (email) => {
    const count = await UserEntity.count({ where: { email } });
    return count > 0;
};

const isUserInUseById = async (id) => {
    const count = await UserEntity.count({ where: { id } });
    return count > 0;
};

const isUserInUseByEmail = async (email) => {
    const count = await UserEntity.count({ where: { email } });
    return count > 0;
};

module.exports = {
    getUserByEmail,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    authenticateUser,
    isEmailInUse,
    isUserInUseById,
    isUserInUseByEmail
};