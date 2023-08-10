const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');

// Apply authentication middleware to all routes
router.use(authMiddleware);

const UserDashboardController = require('../controllers/UserDashboard/UserDashboardController');

/** Route to get user information
 * Retrieves the current user's information to be displayed on the dashboard
 */
router.get('/', UserDashboardController.getUserInfo);

/** Route to update user information
 * Allows the authenticated user to update their own information on the dashboard
 */
router.put('/', UserDashboardController.updateUserInfo);

module.exports = router;
