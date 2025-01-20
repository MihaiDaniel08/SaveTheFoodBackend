// controllers/usersController.js
const { getUserById, addUser, updateUser, deleteUser, authenticateUser } = require('../databaseLayer/usersDb');
const { GetUserDTO, AddUserDTO, UpdateUserDTO, LoginUserDTO } = require('../dtos/userDTOs');

const getUserByIdHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userEntity = await getUserById(userId);
        res.json(GetUserDTO.fromEntity(userEntity));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addUserHandler = async (req, res) => {
    try {
        const userDTO = new AddUserDTO(req.body);
        const userEntity = {
            email: userDTO.email,
            password: userDTO.password,
            name: userDTO.name
        };
        const userEntityReturned = await addUser(userEntity);
        res.json(GetUserDTO.fromEntity(userEntityReturned));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userDTO = new UpdateUserDTO(req.body);
        const userEntity = {
            id: userId,
            email: userDTO.email,
            password: userDTO.password,
            name: userDTO.name
        };
        const userEntityReturned = await updateUser(userEntity);
        res.json(GetUserDTO.fromEntity(userEntityReturned));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUserHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userEntity = await deleteUser(userId);
        res.json(GetUserDTO.fromEntity(userEntity));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUserHandler = async (req, res) => {
    try {
        const userDTO = new LoginUserDTO(req.body);
        const userEntity = await authenticateUser(userDTO.email, userDTO.password);
        if (userEntity) {
            res.json(GetUserDTO.fromEntity(userEntity));
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUserByIdHandler,
    addUserHandler,
    updateUserHandler,
    deleteUserHandler,
    loginUserHandler
};