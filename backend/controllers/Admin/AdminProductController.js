const { MongoClient, ServerApiVersion } = require('mongodb');
const Product = require('../../models/Product')
// To be replaced with env vars for creds, all hard coded strings will be kept in JSON "resources.json"

/**
 * Gets all the product available
 * 
 * @param {request} req 
 * @param {response} res 
 */
const getAllProducts = async (req, res) => {
    try {
        // finds all the products
        const product = await Product.find();
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    };
}

const addProduct = async (req, res) => {
    try {
        // extract product data
        const { 
            name, 
            description, 
            price, 
            shipping_cost,
            rating,
            category,
            image_url
        } = req.body;

        // create a new product
        const newProduct = new Product({
            name,
            description,
            description,
            price,
            shipping_cost,
            rating,
            category,
            image_url
        });

        /**
         * In a real scenerio the image is dumped to a s3 bucket
         * the reference is stored here 
         * 
         * I can also use multer to upload a blob object, but that is not good practice 
         * to store a base x64 string in the no sql db
         */

        // save to data 
        await newProduct.save();

        res.status(200).json({
            message : "Product saved successfully"
        })
    } catch (error) {
        res.status(400).json({
            message : error.message,
        })
    }
}

const testAdminProductsController = async (req, res) => {
    res.status(200).json({
        status: "Works Admin Controller"
    })
}

module.exports = { getAllProducts, testAdminProductsController, addProduct }