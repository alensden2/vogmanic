const express = require('express');
const router = express.Router();

const adminProductController = require('../controllers/Admin/AdminController')
// const middleware = require('../middleware/auth')

/** Test Endpoint */
router.get("/test", adminProductController.testAdminProductsController)
/** Get all products */
router.get("/products", adminProductController.getAllProducts) /**Insert Auth MiddleWare */
/** Post a new product */
router.post("/addProduct", adminProductController.addProduct)
/** Delete a product */
router.delete("/deleteProduct/:id", adminProductController.deleteProduct);
/** Get all confirmed orders */
router.get('/confirmedOrders', adminProductController.getAllConfirmedorders)
/** Get total sale of all confirmed orders */
router.get('/totalSalePerOrders', adminProductController.getTotalCostEachOrder)
/** Get total sale of all confirmed orders */
router.get('/totalSaleAllOrders', adminProductController.getTotalCostPerOrder)

module.exports = router;