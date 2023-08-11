const { MongoClient, ServerApiVersion } = require('mongodb');
const { MONGO_DB_URL } = require('../config');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(MONGO_DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function insertProducts() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      console.log("Connected to MongoDB!");
  
      const db = client.db("VogueManiac"); // Replace "your_database_name" with the name of your database
      const collection = db.collection("products");
  
      // Sample products to insert
      const products = [
        {
          name: "Ray Ban Sunglasses",
          description: "Not only do they look great, but they also provide excellent protection from the sun's harmful rays",
          price: 19.99,
          shipping_cost: 2.35,
          rating: 3.5,
          category: "Sunglasses",
          image_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        },
        {
          name: "Color block shoes",
          description: "Multi colored Shoes",
          price: 29.99,
          shiiping_cost: 2.35,
          rating: 5.0,
          category: "Shoes",
          image_url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
        },
      ];
  
      // Insert the products into the collection
      const result = await collection.insertMany(products);
      console.log(`${result.insertedCount} products inserted.`);
    } catch (error) {
      console.error("Error inserting products:", error);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  
insertProducts();

  
  
  
  
  
  
  
