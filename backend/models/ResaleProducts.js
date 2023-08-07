const mongoose = require('mongoose');

const ResaleProductSchema = mongoose.Schema({
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
    userEmail: {
        type: String,
        required: true,
    },
    isResold: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const ResaleProduct = mongoose.model('ResaleProducts', ResaleProductSchema);

module.exports = ResaleProduct;