const express = require('express');
const router = express.Router();
const authMiddleware=require("../middlewares/authMiddleware");
router.use(authMiddleware);

const resaleProductsController = require('../controllers/ResaleProducts/resaleProductsController')

/** Health Check Endpoint */
router.get("/health-check", (request, response) => {
    response.status(200).send({
        status: true,
    });
})

/** Resale Product List For Product Page Endpoint */
router.get("/getAll", resaleProductsController.getAllResaleProducts);

/** Resale Product List For User Endpoint */
router.post("/get", resaleProductsController.getResaleProducts);

/** Resale Product Details Endpoint */
router.get("/:productId", resaleProductsController.getResaleProduct);

/** Edit Resale Product Details Endpoint */
router.put("/:productId", resaleProductsController.updateResaleProduct);

module.exports = router;