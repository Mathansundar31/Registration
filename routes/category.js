const express = require('express');
const { createCategory, getCategories, deleteCategory } = require('../controller/categorycontroller');
const authMiddleware = require('../middleware/authendication');
const router = express.Router();

router.post('/addcategory', authMiddleware, createCategory);
router.get('/getcategory', authMiddleware, getCategories);
router.delete('/:id', authMiddleware, deleteCategory);

module.exports = router;
