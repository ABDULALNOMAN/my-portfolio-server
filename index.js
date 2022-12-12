const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()


// middelware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.PROJECT_ID}:${process.env.PROJECT_PASS}@cluster0.hvjw1gm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async() => {
  try {
    const documentId = client.db("project").collection("projectItem")

    app.get('/products/:id', async(req, res) => {
      const index = req.params.id
      const data = parseInt(index)
      const query={index:data}
      const result = await documentId.findOne(query)
      res.send(result)
    })
  }
  finally {
    
  }
}
run().catch((error) => {
  console.log(error)
})

app.get('/', (req, res) => {
    res.send('hello world')
})
app.listen(port, () => {
    console.log('hello world i am server')
})