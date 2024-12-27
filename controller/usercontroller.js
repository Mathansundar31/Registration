const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const { hashPassword } = require('../utils/jwtUtils');
const {generateToken, comparePassword } = require('../utils/jwtUtils');

const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Save the new user to the database with hashed password
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  const login = async (req, res) => {
    const { email, password } = req.body;
  
    // Find the user by email
    const user = await User.findOne({ email });
    
    // Log the found user to verify
    console.log('User found:', user);
  
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    // Check if the provided password matches the stored password
    const validPassword = await user.comparePassword(password);
    console.log('Password valid:', validPassword);  // Log the result of password comparison
  
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    // Generate JWT token if authentication is successful
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
    res.status(200).json({ token });
  };

module.exports = { register, login };
