const Product = require('../models/productmodel');
const Category = require('../models/categorymodel');

const createProduct = async (req, res) => {
  try {
    console.log('Authenticated User ID:', req.user.id);  // Verify authenticated user ID
    console.log('Received categoryId:', req.body.categoryId);  // Verify categoryId in request body

    // Find category by ID and ensure it belongs to the authenticated user
    const category = await Category.findOne({ _id: req.body.categoryId, userId: req.user.id });
    console.log('Found category:', category);  // Log the category retrieved

    if (!category) {
      console.log('No category found or category does not belong to the user');
      return res.status(400).json({ message: 'Category not found or does not belong to user' });
    }

    // Proceed to create the product if category is valid
    const product = new Product({ name: req.body.name, price: req.body.price, categoryId: req.body.categoryId });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};


const getProducts = async (req, res) => {
  const products = await Product.find({
    categoryId: { $in: await Category.find({ userId: req.user._id }).distinct('_id') }
  }).populate('categoryId');

  res.status(200).json(products);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate('categoryId');

  if (!product || product.categoryId.userId.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Product not found or does not belong to user' });
  }

  await product.remove();
  res.status(200).json({ message: 'Product deleted successfully' });
};

module.exports = { createProduct, getProducts, deleteProduct };
