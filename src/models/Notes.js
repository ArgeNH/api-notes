const { DataTypes } = require('sequelize');
const sequelize = require("../database/dbConnection");

const noteModel = sequelize.define("note",
    {
        idNote: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

module.exports = noteModel;