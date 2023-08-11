const mongoose = require('mongoose');
const productSchema = require('./Product');

// Defining the schema for confirmed orders, containing details like order ID, items, status, etc.
const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true, // Order ID is required
    },
    items: [productSchema.schema], // Array of products in the order
    status: {
        type: String,
        enum: ['Placed', 'Shipped', 'Delivered', 'Cancelled'], // Enum to ensure status is one of the defined values
        default: 'Placed', // Default status when the order is created
    },
    shippingAddress: {
        type: String,
        required: true, // Shipping address is required
    },
    cancellationReason: {
        type: String,
        default: null, // Reason for cancellation, if applicable
    },
    cancellationComments: {
        type: String,
        default: null, // Additional comments on cancellation, if applicable
    },
    userEmail: {
        type: String,
        default: null, // Email of the user who placed the order
    }
}, { timestamps: true }); // Including timestamps for created_at and updated_at fields

const ConfirmedOrders = mongoose.model('confirmedOrders', orderSchema);

module.exports = ConfirmedOrders;
