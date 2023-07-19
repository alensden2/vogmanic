const { MongoClient, ServerApiVersion } = require('mongodb');
const Product = require('../../models/Product')
// To be replaced with env vars for creds, all hard coded strings will be kept in JSON "resources.json"

const getAllProducts = async (req,res) => {
    try {
        // finds all the products
        const product = await Product.find();
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({
            message : error.message
        });
    };
}

const testAdminProductsController = async (req,res) => {
    res.status(200).json({
        status : "Works Admin Controller"
    })
}

module.exports = { getAllProducts, testAdminProductsController}