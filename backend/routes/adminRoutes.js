const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');

const adminProductController = require('../controllers/Admin/AdminController')
// const middleware = require('../middleware/auth')

router.use(authMiddleware);

/** Test Endpoint */
router.get("/test", adminProductController.testAdminProductsController)
/** Get all products */
router.get("/products", adminProductController.getAllProducts) /**Insert Auth MiddleWare */
/** Post a new product */
router.post("/addProduct", adminProductController.addProduct)
/** Delete a product */
router.delete("/deleteProduct/:id", adminProductController.deleteProduct);
/** Update a product */
router.put("/updateProduct/:id", adminProductController.updateProduct);
/** Get all confirmed orders */
router.get('/confirmedOrders', adminProductController.getAllConfirmedorders)
/** Get Total orders */
router.get('/totalOrders', adminProductController.countTotalOrders)
/** Get Total Items Sold */
router.get('/totalItemsSold', adminProductController.calculateTotalItemsSold)
/** Get total sale of all confirmed orders */
router.get('/totalSalePerOrders', adminProductController.getTotalCostEachOrder)
/** Get total sale of all confirmed orders */
router.get('/totalSaleAllOrders', adminProductController.getTotalCostPerOrder)
/** Get all the employees */
router.get('/employees', adminProductController.getAllEmployees)
/** Post a new employee */
router.post('/addEmployee', adminProductController.addEmployee)
/** Delete an employee */
router.delete('/deleteEmployee/:id', adminProductController.deleteEmployee)
module.exports = router;