const mongoose = require('mongoose');

// Category schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Name of the category
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true  // userId is required to reference the user
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
