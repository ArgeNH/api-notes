const Sequelize = require('sequelize');
const sequelize = require("../database/dbConnection");

const noteModel = sequelize.define("note", {
    idNote: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync();

module.exports = noteModel;