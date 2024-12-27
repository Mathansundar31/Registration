const Category = require('../models/categorymodel');
const User = require('../models/usermodel');


const createCategory = async (req, res) => {
    try {
      const { name } = req.body;
      const userId = req.user.id;  // Ensure you're using the decoded user ID here
      const category = new Category({ name, userId });
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ message: 'Error creating category' });
    }
  };
  

const getCategories = async (req, res) => {
  const categories = await Category.find({ userId: req.user._id });
  res.status(200).json(categories);
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findOne({ _id: id, userId: req.user._id });

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  await category.remove();
  res.status(200).json({ message: 'Category deleted successfully' });
};

module.exports = { createCategory, getCategories, deleteCategory };
