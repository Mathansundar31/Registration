const express = require('express');
const { createProduct, getProducts, deleteProduct } = require('../controller/productcontroller');
const authMiddleware = require('../middleware/authendication');
const router = express.Router();

router.post('/addproduct', authMiddleware, createProduct);
router.get('/getproduct', authMiddleware, getProducts);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
