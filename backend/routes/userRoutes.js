const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User/UserController');

// User registration route
router.post('/signup', UserController.registerUser);

// User login route
router.post('/login', UserController.loginUser);

module.exports = router;
