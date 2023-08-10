const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');

// Apply authentication middleware to all routes
router.use(authMiddleware);

const adminProductController = require('../controllers/Admin/AdminController');

/** Get all products
 * Retrieve all products available
 */
router.get("/products", adminProductController.getAllProducts);

/** Post a new product
 * Create a new product record
 */
router.post("/addProduct", adminProductController.addProduct);

/** Delete a product
 * Delete a specific product by ID
 */
router.delete("/deleteProduct/:id", adminProductController.deleteProduct);

/** Update a product
 * Update a specific product by ID
 */
router.put("/updateProduct/:id", adminProductController.updateProduct);

/** Get all confirmed orders
 * Retrieve all confirmed orders
 */
router.get('/confirmedOrders', adminProductController.getAllConfirmedorders);

/** Get Total orders
 * Count the total number of orders
 */
router.get('/totalOrders', adminProductController.countTotalOrders);

/** Get Total Items Sold
 * Calculate the total number of items sold
 */
router.get('/totalItemsSold', adminProductController.calculateTotalItemsSold);

/** Get total sale of all confirmed orders per order
 * Calculate the total sale for each confirmed order
 */
router.get('/totalSalePerOrders', adminProductController.getTotalCostEachOrder);

/** Get total sale of all confirmed orders
 * Calculate the total sale for all confirmed orders
 */
router.get('/totalSaleAllOrders', adminProductController.getTotalCostPerOrder);

/** Get all the employees
 * Retrieve all employees
 */
router.get('/employees', adminProductController.getAllEmployees);

/** Post a new employee
 * Create a new employee record
 */
router.post('/addEmployee', adminProductController.addEmployee);

/** Delete an employee
 * Delete a specific employee by ID
 */
router.delete('/deleteEmployee/:id', adminProductController.deleteEmployee);

module.exports = router;
