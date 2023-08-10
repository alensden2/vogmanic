const mongoose = require('mongoose');

// Defining the schema for a product, containing details like name, description, price, etc.
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, // Name of the product is required
    },
    description: {
        type: String,
        required: true, // Description of the product is required
    },
    price: {
        type: Number,
        required: true, // Price of the product is required
    },
    shipping_cost: {
        type: Number,
        required: true, // Shipping cost for the product is required
    },
    rating: {
        type: Number,
        required: true, // Rating of the product is required
    },
    category: {
        type: String,
        required: true, // Category of the product is required
    },
    image_url: {
        type: String,
        required: true, // URL of the product's image is required
    },
}, { timestamps: true }); // Including timestamps for created_at and updated_at fields

const Product = mongoose.model('products', productSchema, 'products');

module.exports = Product;
