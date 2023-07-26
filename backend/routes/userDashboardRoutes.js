const express = require('express');
const router = express.Router();
const UserDashboardController = require('../controllers/UserDashboard/UserDashboardController');
const authMiddleware = require('../middlewares/authMiddleware.js');

// Middleware to authenticate user before accessing the dashboard routes
router.use(authMiddleware);

// Route to get user information
router.get('/', UserDashboardController.getUserInfo);

// Route to update user information
router.put('/', UserDashboardController.updateUserInfo);

module.exports = router;
