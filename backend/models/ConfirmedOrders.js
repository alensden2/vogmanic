const mongoose = require('mongoose');
const productSchema = require('./Product')
const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    items: [productSchema.schema],
    status: {
        type: String,
        enum: ['Placed', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Placed',
    },
    shippingAddress: {
        type: String,
        required: false,
    },
    cancellationReason: {
        type: String,
        default: null,
    },
    cancellationComments: {
        type: String,
        default: null,
    },
    userEmail: {
        type: String,
        default: null,
    }
}, { timestamps: true });

const ConfirmedOrders = mongoose.model('confirmedOrders', orderSchema);

module.exports = ConfirmedOrders;