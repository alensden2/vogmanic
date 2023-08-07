const express = require('express');
const router = express.Router();
const authMiddleware=require("../middlewares/authMiddleware");
router.use(authMiddleware);

const orderController = require('../controllers/Order/OrderController')

/** Health Check Endpoint */
router.get("/health-check", (request, response) => {
    response.status(200).send({
        status: true,
    });
})

/** Order Place Endpoint */
router.post("/place", orderController.placeOrder);

/** Get Orders Endpoint */
router.post("/getAll", orderController.getAllOrders);

/** Get Order Details by ID Endpoint */
router.get("/:orderId", orderController.getOrderById);

/** Cancel Order Endpoint */
router.put("/:orderId/cancel", orderController.cancelOrder);

module.exports = router;