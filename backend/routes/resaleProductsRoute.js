const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Apply authentication middleware to all routes
router.use(authMiddleware);

const resaleProductsController = require('../controllers/ResaleProducts/resaleProductsController');

/** Resale Product List For Product Page Endpoint
 * Get all the resale products available for all users to view
 */
router.get("/getAll", resaleProductsController.getAllResaleProducts);

/** Resale Product List For User Endpoint
 * Retrieve all the resale products specific to the authenticated user
 */
router.post("/get", resaleProductsController.getResaleProducts);

/** Resale Product Details Endpoint
 * Get the details of a specific resale product using product ID
 */
router.get("/:productId", resaleProductsController.getResaleProduct);

/** Edit Resale Product Details Endpoint
 * Update the details of a specific resale product using product ID
 */
router.put("/:productId", resaleProductsController.updateResaleProduct);

module.exports = router;
