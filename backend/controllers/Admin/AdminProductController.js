const { MongoClient, ServerApiVersion } = require('mongodb');
// To be replaced with env vars for creds, all hard coded strings will be kept in JSON "resources.json"
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


export const getAllProducts = async (req,res) => {

}