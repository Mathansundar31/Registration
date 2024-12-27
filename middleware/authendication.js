const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    console.log('Received token:', token);  // Log the token to ensure it's correct

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Decoded token:', decoded);  // Log the decoded token

    // Attach decoded data (e.g., user ID) to the request object
    req.user = decoded;
    console.log('Authenticated User ID:', req.user.id);  // Ensure this is correct

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error decoding token:', error);  // Log the error if decoding fails
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;

