const { MongoClient, ServerApiVersion } = require('mongodb');
const Product = require('../../models/Product');
const { MONGO_DB_URL } = require('../../config');

const dbName = "VogueManiac";
const client = new MongoClient(MONGO_DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

/**
 * Fetch all products.
 * 
 * @param {request} req - The request object.
 * @param {response} res - The response object to send the retrieved products.
 */
async function fetchProducts(req, res) {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.send("Error");
  }
}


/**
 * Save cart details to MongoDB.
 * 
 * @param {request} req - The request object containing product details.
 * @param {response} res - The response object to send the status.
 */
async function saveCartDetailsToDB(req, res) {
  try{
    await client.connect();  
    const db = client.db(dbName);
    const collection = db.collection('cart'); 

    const productToAdd = req.body;
    const email=productToAdd.email;
    const productId = productToAdd._id+email;
    const existingProduct = await collection.findOne({ _id: productId, email:email });

    if (existingProduct) {
        // If a document with the same _id already exists, increment the count field
      await collection.updateOne(
        { _id: productId },
        { $inc: { count: 1 } }
      );
      res.status(200).json({ message: 'Product count incremented in the cart', existingProduct });
    } else {
      // If no document with the same _id exists, insert a new document
      productToAdd._id=productId
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

/**
 * Fetch cart details from MongoDB.
 * 
 * @param {request} req - The request object containing email.
 * @param {response} res - The response object to send the retrieved cart products.
 */
async function fetchCartDetailsFromDB(req,res) {
  console.log("here");
  try{
      await client.connect();  
      const db = client.db(dbName);
      const email=req.body.email;
      const collection = db.collection('cart'); 
      const cart_products = await collection.find({email:email}).toArray();
      res.send(cart_products);
    } 
  catch (error) {
      console.error('Error fetching cart details from MongoDB', error);
      res.status(500).json({ message: 'Failed to add cart details to MongoDB' });
    }
}

/**
 * Update cart quantity.
 * 
 * @param {request} req - The request object containing product ID, email, and new quantity.
 * @param {response} res - The response object to send the status.
 */
async function updateCartQuantity(req,res) {
  try{
      await client.connect();  
      const db = client.db(dbName);
      const collection = db.collection('cart'); 
      const email=req.body.email;
      const productId = req.body.productId+email;
      const newQuantity = req.body.newQuantity;
      console.log("productid: "+productId);
      const existingProduct = await collection.findOne({ _id: productId });

      if (existingProduct) {
        // If a document with the same _id already exists, update the count field
        await collection.updateOne(
          { _id: productId, email:email },
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

/**
 * Delete a cart item.
 * 
 * @param {request} req - The request object containing product ID and email.
 * @param {response} res - The response object to send the status.
 */
  async function deleteCartItem(req,res) {
    // try{
        await client.connect();  
        const db = client.db(dbName);
        const collection = db.collection('cart'); 
  
        const productId = req.body.productId;
        const email=req.body.email;
        console.log()

        // const objectIdProductId = new ObjectId(productId);

    // Find and delete the item with the given productId from the cart
    const result = await collection.deleteOne({ _id: productId, email:email });

      if (result.deletedCount === 1) {
        console.log('Product removed from the cart:', productId);
        res.status(200).json({ message: 'Product removed from the cart' });
      } else {
        console.log('Product not found in the cart.');
        res.status(404).json({ error: 'Product not found in the cart.' });
      }
    }

/**
 * Delete all cart items.
 * 
 * @param {request} req - The request object containing email.
 * @param {response} res - The response object to send the status.
 */
async function deleteCart(req,res)
{
  const email = req.body.email;
  await client.connect();  
  const db = client.db(dbName);
  const collection = db.collection('cart'); 

  collection.deleteMany({email:email});

  res.status(200).json({message: "success"});

}    

/**
 * Save wishlist details to MongoDB.
 * 
 * @param {request} req - The request object containing product details.
 * @param {response} res - The response object to send the status.
 */
async function saveWishlistDetailsToDB(req,res) {
  try{
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

/**
 * Fetch wishlist details from MongoDB.
 * 
 * @param {request} req - The request object.
 * @param {response} res - The response object to send the retrieved wishlist products.
 */
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

/**
 * Delete a wishlist item.
 * 
 * @param {request} req - The request object containing product ID.
 * @param {response} res - The response object to send the status.
 */
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

module.exports = {
  fetchProducts,
  saveCartDetailsToDB,
  fetchCartDetailsFromDB,
  updateCartQuantity,
  deleteCartItem,
  saveWishlistDetailsToDB,
  fetchWishlistDetailsFromDB,
  deleteWishlistItem,
  deleteCart
};