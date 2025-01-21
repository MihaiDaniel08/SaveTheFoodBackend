const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    }
});

module.exports = sequelize;