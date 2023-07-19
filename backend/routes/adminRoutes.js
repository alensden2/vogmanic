const express = require('express');
const router = express.Router();

const adminProductController = require('../controllers/Admin/AdminProductController')
// const middleware = require('../middleware/auth')

/** Test Endpoint */
router.get("/test", adminProductController.testAdminProductsController)
/** Get all products */
router.get("/products", adminProductController.getAllProducts) /**Insert Auth MiddleWare */
/** Post a new product */
router.post("/addProduct", adminProductController.addProduct)

module.exports = router;