const { ObjectId } = require('mongodb');
const ResaleProducts = require('../../models/ResaleProducts');

/**
 * Get all resale products
 * 
 * This function retrieves all resale products that have been marked as resold.
 *
 * @param {request} request - The request object.
 * @param {response} response - The response object to send the retrieved products.
 */
const getAllResaleProducts = async (request, response) => {
    try {
        // Get all the products in resale
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
 * Get resale products for a specific user
 * 
 * This function retrieves resale products for a particular user and resale status.
 *
 * @param {request} request - The request object containing user email and resale status.
 * @param {response} response - The response object to send the retrieved products.
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
 * Get resale product details by ID
 * 
 * This function retrieves the details of a specific resale product by its ID.
 *
 * @param {request} request - The request object containing product ID.
 * @param {response} response - The response object to send the product details.
 */
const getResaleProduct = async (request, response) => {
    try {
        const { productId } = request.params;

        // Find the product by ID
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
 * This function updates the details of a specific resale product, including its description,
 * price, and shipping cost, and marks it as resold.
 *
 * @param {request} request - The request object containing product ID and updated details.
 * @param {response} response - The response object to confirm the update.
 */
const updateResaleProduct = async (request, response) => {
    try {
        const { productId } = request.params;
        const { description, price, shipping_cost } = request.body;

        // Update the product with new details
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
