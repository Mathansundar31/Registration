const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Utility function to generate JWT token
const generateToken = (userId) => {
  // Payload contains the user ID
  const payload = { userId };

  // Secret key used for signing the token, comes from environment variables
  const secretKey = process.env.JWT_SECRET;

  // Set token expiration time (e.g., 1 hour)
  const expiresIn = '1h';

  // Generate and return the token
  return jwt.sign(payload, secretKey, { expiresIn });
};

// Utility function to verify JWT token
const verifyToken = (token) => {
  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;  // Returns decoded payload (e.g., user ID)
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Utility function to hash a password
const hashPassword = async (password) => {
  const saltRounds = 10;  // Cost factor for bcrypt (how many times to salt the password)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Utility function to compare a plain password with a hashed password
const comparePassword = async (plainPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
};
