const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const UserInfo = require('../../models/UserInfo');
const { JWT_SECRET_KEY } = require('../../config');

/**
 * Generate Token
 * 
 * This function generates a JSON web token using a user's ID.
 *
 * @param {string} userId - The user's ID for generating the token.
 * @returns {string} - Returns a JSON web token.
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

/**
 * Register User
 * 
 * This function handles user registration. It validates the input, checks if the user already exists,
 * encrypts the password, saves the new user in the database, and generates a JSON web token.
 *
 * @param {request} req - The request object containing user information such as email, password, confirmPassword, and birthdate.
 * @param {response} res - The response object to send the registration status and token.
 */
const registerUser = async (req, res) => {
  try {
    const { email, password, confirmPassword, birthdate } = req.body;

    // Validate mandatory fields
    if (!email || !password || !confirmPassword || !birthdate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Encrypt password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save new user
    const newUser = new User({
      email,
      password: hashedPassword,
      birthdate,
    });
    await newUser.save();

    // Extract username from email
    const username = email.split('@')[0];

    // Check and update user info
    let userInfo = await UserInfo.findOne({ userId: newUser._id }) || new UserInfo({ userId: newUser._id });
    userInfo.username = username;
    userInfo.email = email;
    await userInfo.save();

    // Generate token and send response
    const token = generateToken(newUser._id);
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Login User
 * 
 * This function handles user login. It checks the user's credentials and, if valid, generates a JSON web token.
 *
 * @param {request} req - The request object containing email and password.
 * @param {response} res - The response object to send the login status and token.
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check user credentials
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token and send response
    const token = generateToken(user._id);
    res.status(200).json({ message: 'Login successful', token, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};