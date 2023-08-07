const { ObjectId } = require('mongodb');
const ResaleProducts = require('../../models/ResaleProducts');

/**
 * Get resale products
 * 
 * @param {request} request 
 * @param {response} response 
 */
const getAllResaleProducts = async (request, response) => {
    try {

        const products = await ResaleProducts.find({
            isResold: true
        });

        response.status(200).json(products);
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
};

/**
 * Get resale products
 * 
 * @param {request} request 
 * @param {response} response 
 */
const getResaleProducts = async (request, response) => {
    try {
        const { userEmail, isResold } = request.body;

        // Find the products for this user
        const products = await ResaleProducts.find({
            userEmail,
            isResold
        });

        response.status(200).json(products);
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
};

/**
 * Get resale product details
 * 
 * @param {request} request 
 * @param {response} response 
 */
const getResaleProduct = async (request, response) => {
    try {
        const { productId } = request.params;

        const productDoc = await ResaleProducts.findById(productId);
        const product = productDoc.toObject();

        response.status(200).json(product);
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
};

/**
 * Update resale product details
 * 
 * @param {request} request 
 * @param {response} response 
 */
const updateResaleProduct = async (request, response) => {
    try {
        const { productId } = request.params;
        const { description, price, shipping_cost } = request.body;

        await ResaleProducts.findOneAndUpdate(
            { _id: productId },
            {
                description: description,
                price: price,
                shipping_cost: shipping_cost,
                isResold: true
            }
        );

        response.status(201).json();
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getResaleProducts,
    getResaleProduct,
    updateResaleProduct,
    getAllResaleProducts,
};
