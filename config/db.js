const Sequelize = require('sequelize');
const sequelize = new Sequelize('savethefood', 'root', '', {
    dialect: 'postgres',
    host: 'localhost',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    }
});
module.exports = sequelize;