const { response } = require('express');
const categoryModel = require('../models/Category');

const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.findAll();

        if (categories.length === 0)
            return res.status(204).json({
                success: false,
                message: 'Categories is empty'
            });

        return res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        await categoryModel.create({
            name
        });
        return res.status(201).json({
            success: true,
            message: 'Category created successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteCategory = async (req, res) => {
    const { idCategory } = req.params;
    try {
        const category = await categoryModel.findByPk(idCategory);
        if (!category)
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        await category.destroy();
        return res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getCategories,
    createCategory,
    deleteCategory
}