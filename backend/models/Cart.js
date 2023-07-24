const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    shipping_cost: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Cart = mongoose.model('cart', productSchema, 'cart');

module.exports = Cart