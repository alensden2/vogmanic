const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET_KEY } = require('../config');

// Middleware to authenticate user based on the JSON web token
const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: 'Authorization token not found' });
    }

    // Verify the token and get the user ID
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    const userId = decodedToken.userId;

    // Fetch the user based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Attach the user ID to the request object for future use
    req.userId = userId;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
