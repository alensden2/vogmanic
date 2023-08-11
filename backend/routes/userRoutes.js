const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User/UserController');

/** User registration route
 * Endpoint for a new user to sign up, providing necessary details
 */
router.post('/signup', UserController.registerUser);

/** User login route
 * Endpoint for a registered user to log in using their credentials
 */
router.post('/login', UserController.loginUser);

module.exports = router;
