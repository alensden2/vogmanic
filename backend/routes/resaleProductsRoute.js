const express = require('express');
const router = express.Router();
const authMiddleware=require("../middlewares/authMiddleware");
// router.use(authMiddleware);

const resaleProductsController = require('../controllers/ResaleProducts/resaleProductsController')

/** Health Check Endpoint */
router.get("/health-check", (request, response) => {
    response.status(200).send({
        status: true,
    });
})

/** Resale Product List Endpoint */
router.post("/getAll", resaleProductsController.getResaleProducts);

/** Resale Product Details Endpoint */
router.get("/:productId", resaleProductsController.getResaleProduct);

/** Edit Resale Product Details Endpoint */
router.put("/:productId", resaleProductsController.updateResaleProduct);

module.exports = router;