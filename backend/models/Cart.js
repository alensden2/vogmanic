const mongoose = require('mongoose');

// Defining the schema for the cart, containing the product details and user email
const cartSchema = mongoose.Schema({
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
        required: true, // Shipping cost is required
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
        required: true, // Image URL of the product is required
    },
    email: {
        type: String,
        required: true // Email of the user associated with the cart item is required
    }
}, { timestamps: true }); // Including timestamps for created_at and updated_at fields

const Cart = mongoose.model('cart', cartSchema, 'cart');

module.exports = Cart;
