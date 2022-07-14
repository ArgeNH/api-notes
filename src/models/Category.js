const { DataTypes } = require('sequelize');
const sequelize = require("../database/dbConnection");

const categoryModel = sequelize.define("category",
    {
        idCategory: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false
    }
);

module.exports = categoryModel;