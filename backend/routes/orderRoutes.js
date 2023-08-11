const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Apply authentication middleware to all routes
router.use(authMiddleware);

const orderController = require('../controllers/Order/OrderController');

/** Order Place Endpoint
 * Endpoint to handle placing an order.
 * Requires authentication as defined by the authMiddleware.
 */
router.post("/place", orderController.placeOrder);

/** Get Orders Endpoint
 * Endpoint to retrieve all orders for an authenticated user.
 */
router.post("/getAll", orderController.getAllOrders);

/** Get Order Details by ID Endpoint
 * Endpoint to retrieve detailed information about a specific order.
 * Order ID is provided as a URL parameter.
 */
router.get("/:orderId", orderController.getOrderById);

/** Cancel Order Endpoint
 * Endpoint to cancel a specific order.
 * Order ID is provided as a URL parameter.
 */
router.put("/:orderId/cancel", orderController.cancelOrder);

module.exports = router;
