const Sequelize = require('sequelize');
const sequelize = require("../database/dbConnection");

const categoryModel = sequelize.define("category", {
    idCategory: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync();

module.exports = categoryModel;