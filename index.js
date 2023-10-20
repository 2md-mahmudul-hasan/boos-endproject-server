const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const port = process.env.port || 5000;

app.use(express.json())
app.use(cors())



const { MongoClient, ServerApiVersion } = require('mongodb');
const { config } = require('dotenv');
const uri = `mongodb+srv://${process.env.user_name}:${process.env.user_pass}@cluster0.bik86wn.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const menuCollections = client.db('bistro_boss').collection('menu')
    const reviewCollections = client.db('bistro_boss').collection('reviews')
    const cartCollections = client.db('bistro_boss').collection('carts')

    app.get('/menu', async(req, res)=>{
      const result = await menuCollections.find().toArray()
      res.send(result)
    })
  app.get('/reviews', async(req, res)=>{
      const result = await reviewCollections.find().toArray()
      res.send(result)
    })

    app.post('/carts', async(req, res)=>{
      const item = req.body;
      console.log(item)
      const result = await cartCollections.insertOne(item)
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
  res.send('server is running')
})

app.listen(port, ()=>{
  console.log('server is running')
})