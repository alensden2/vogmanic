const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const User = require('../../models/User');
const UserInfo = require('../../models/UserInfo');
const crypto=require('crypto')


// Generate a random key with 32 bytes length (256 bits)
const randomKey = crypto.randomBytes(32).toString('hex');

// Set the JWT_SECRET environment variable (in development environment)
// process.env.JWT_SECRET = randomKey;

// const jwtSecretKey = process.env.JWT_SECRET 
const jwtSecretKey = "SECRET_KEY";

// Function to generate a JSON web token
const generateToken = (userId) => {
  return jwt.sign({ userId }, jwtSecretKey, { expiresIn: '1h' });
};

// Controller function for user registration
exports.registerUser = async (req, res) => {
  try {
    const { email, password, confirmPassword, birthdate } = req.body;

    // Validate form fields
    if (!email || !password || !confirmPassword || !birthdate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Encrypt the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the user data in the database
    const newUser = new User({
      email,
      password: hashedPassword,
      birthdate,
    });

    await newUser.save();

    // Automatically extract the username from the email
    const username = email.split('@')[0];

    // Check if user info already exists
    let userInfo = await UserInfo.findOne({ userId: newUser._id });

    if (!userInfo) {
      // If user info doesn't exist, create a new entry for the user
      userInfo = new UserInfo({ userId: newUser._id });
    }

    // Update user info with username and email
    userInfo.username = username;
    userInfo.email = email;

    // Save the updated user information
    await userInfo.save();

    // Generate a JSON web token for the registered user
    const token = generateToken(newUser._id,jwtSecretKey);

    // Return the token in the response
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function for user login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ email });

    // If user not found or password doesn't match, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JSON web token for the authenticated user
    const token = generateToken(user._id, jwtSecretKey);

    // Return the token in the response
    res.status(200).json({ message: 'Login successful', token, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
