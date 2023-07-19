const express = require('express');

const router = express.Router();
const adminProductController = require('../controllers/Admin/AdminProductController')
/** Get all products */
router.get("/products", adminProductController.getAllProducts) /**Insert Auth MiddleWare */