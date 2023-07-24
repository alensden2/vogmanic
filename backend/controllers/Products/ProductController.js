const { MongoClient, ServerApiVersion } = require('mongodb');
const Product = require('../../models/Product')
const ConfirmedOrders = require('../../models/ConfirmedOrders');

const uri = "mongodb+srv://admin:admin%40123@cluster0.htrbjdo.mongodb.net/Cluster0?retryWrites=true&w=majority";
const dbName = "VogueManiac"
const collectionName = "products"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function fetchProducts(req,res) {
    try {
      const products = await Product.find();    
      res.send(products);

      } catch (error) {
        console.error('Error fetching products:', error);
        res.send("Error")
      }
  }

  async function saveCartDetailsToDB(req,res) {
    try{
        await client.connect();  
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('cart'); 

        const productToAdd = req.body;
        const productId = productToAdd._id;

        const existingProduct = await collection.findOne({ _id: productId });

        if (existingProduct) {
            // If a document with the same _id already exists, increment the count field
            await collection.updateOne(
              { _id: productId },
              { $inc: { count: 1 } }
            );
          res.status(200).json({ message: 'Product count incremented in the cart', existingProduct });
         } 
        else {
          // If no document with the same _id exists, insert a new document
          const newProduct = { ...productToAdd, count: 1 };
          const addedProduct = await collection.insertOne(newProduct);
          res.status(201).json({ message: 'Cart details added to MongoDB', addedProduct });
        }
    }
    catch (error) {
        console.error('Error adding cart details to MongoDB', error);
        res.status(500).json({ message: 'Failed to add cart details to MongoDB' });
      }
    }

async function fetchCartDetailsFromDB(req,res) {
  try{
      await client.connect();  
      const db = client.db(dbName);
    
      const collection = db.collection('cart'); 
      const cart_products = await collection.find().toArray();
      res.send(cart_products);
    } 
  catch (error) {
      console.error('Error fetching cart details from MongoDB', error);
      res.status(500).json({ message: 'Failed to add cart details to MongoDB' });
    }
}

async function updateCartQuantity(req,res) {
  try{
      await client.connect();  
      const db = client.db(dbName);
      const collection = db.collection('cart'); 

      const productId = req.body.productId;;
      const newQuantity = req.body.newQuantity;

      const existingProduct = await collection.findOne({ _id: productId });

      if (existingProduct) {
        // If a document with the same _id already exists, update the count field
        await collection.updateOne(
          { _id: productId },
          { $set: { count: newQuantity } }
        );
        res.status(200).json({ message: 'Product count updated in the cart', existingProduct });
      } else {
        // If no document with the same _id exists, insert a new document
        const newProduct = { _id: productId, count: newQuantity };
        const addedProduct = await collection.insertOne(newProduct);
        res.status(201).json({ message: 'Cart details added to MongoDB', addedProduct });
      }
  }
  catch (error) {
      console.error('Error adding cart details to MongoDB', error);
      res.status(500).json({ message: 'Failed to add cart details to MongoDB' });
    }
  }

  async function deleteCartItem(req,res) {
    // try{
        await client.connect();  
        const db = client.db(dbName);
        const collection = db.collection('cart'); 
  
        const productId = req.body.productId;

        // const objectIdProductId = new ObjectId(productId);

    // Find and delete the item with the given productId from the cart
    const result = await collection.deleteOne({ _id: productId });

      if (result.deletedCount === 1) {
        console.log('Product removed from the cart:', productId);
        res.status(200).json({ message: 'Product removed from the cart' });
      } else {
        console.log('Product not found in the cart.');
        res.status(404).json({ error: 'Product not found in the cart.' });
      }
    }

async function saveWishlistDetailsToDB(req,res) {
  try{
      await client.connect();  
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('wishlist'); 

      const productToAdd = req.body;
      const productId = productToAdd._id;

      const existingProduct = await collection.findOne({ _id: productId });

      if (existingProduct) {
        res.status(200).json({ message: 'Product already in wishlist ', existingProduct });
       } 
      else {
        // If no document with the same _id exists, insert a new document
        const newProduct = { ...productToAdd, count: 1 };
        const addedProduct = await collection.insertOne(newProduct);
        res.status(201).json({ message: 'Wishlist details added to MongoDB', addedProduct });
      }
  }
  catch (error) {
      console.error('Error adding wishlist details to MongoDB', error);
      res.status(500).json({ message: 'Failed to add wishlist details to MongoDB' });
    }
  }

async function fetchWishlistDetailsFromDB(req,res) {
try{
    await client.connect();  
    const db = client.db(dbName);
  
    const collection = db.collection('wishlist'); 
    const wishlist_products = await collection.find().toArray();
    res.send(wishlist_products);
  } 
catch (error) {
    console.error('Error fetching wishlist details from MongoDB', error);
    res.status(500).json({ message: 'Failed to add wishlist details to MongoDB' });
  }
}

async function deleteWishlistItem(req,res) {
  try{
      await client.connect();  
      const db = client.db(dbName);
      const collection = db.collection('wishlist'); 

      const productId = req.body.productId;
      const result = await collection.deleteOne({ _id: productId });

      if (result.deletedCount === 1) {
        console.log('Product removed from the wishlist:', productId);
        res.status(200).json({ message: 'Product removed from the wishlist' });
      } else {
        console.log('Product not found in the wishlist.');
        res.status(404).json({ error: 'Product not found in the wishlist.' });
      }
}
  catch (error) {
      console.error("Failed to delete from wishlist', error",error);
      res.status(500).json({ message: 'Failed to delete from Wishlist' });
    }
  }

module.exports = { fetchProducts, saveCartDetailsToDB, fetchCartDetailsFromDB,updateCartQuantity,deleteCartItem, saveWishlistDetailsToDB,fetchWishlistDetailsFromDB,deleteWishlistItem };