const { Router } = require('express');
const {
    getCategories,
    createCategory,
    deleteCategory
} = require('../controller/category');

const router = Router();

router.get('/', getCategories);

router.post('/new-category', createCategory);

router.delete('/delete-category/:idCategory', deleteCategory);

module.exports = router;