const mongoose = require('mongoose');
const productSchema = require('./Product')
const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    items: [productSchema.schema],
}, { timestamps: true });

const ConfirmedOrders = mongoose.model('confirmedOrders', orderSchema);

module.exports = ConfirmedOrders;