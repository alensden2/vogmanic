const mongoose = require('mongoose');

// Defining the schema for a resale product. These are products that users intend to sell second-hand.
const ResaleProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,  // Name of the resale product is required
    },
    description: {
        type: String,
        required: true,  // Description provides details about the resale product
    },
    price: {
        type: Number,
        required: true,  // Price at which the user wishes to resell the product
    },
    shipping_cost: {
        type: Number,
        required: true,  // Shipping cost associated with the resale product
    },
    rating: {
        type: Number,
        required: true,  // Rating, possibly indicating the condition or quality of the resale product
    },
    category: {
        type: String,
        required: true,  // Category to which the resale product belongs
    },
    image_url: {
        type: String,
        required: true,  // URL for the image of the resale product
    },
    userEmail: {
        type: String,
        required: true,  // Email of the user selling the product, to possibly contact or track the seller
    },
    isResold: {
        type: Boolean,
        default: false,  // Flag to indicate if the product has been resold. Defaults to 'false' indicating it hasn't been sold yet.
    }
}, { timestamps: true });  // Including timestamps for created_at and updated_at fields

const ResaleProduct = mongoose.model('ResaleProducts', ResaleProductSchema);

module.exports = ResaleProduct;
