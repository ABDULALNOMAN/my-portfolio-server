const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const allProject  = client.db("project").collection("projectData")
    const documentId = client.db("project").collection("projectItem")
    const aboutsData = client.db("project").collection("about")
    app.get("/projectdata",async(req, res)=>{
      const query = {}
      const result = await allProject.find(query).toArray()
      res.send(result )
    })
    app.get('/products/:id', async(req, res) => {
      const id = req?.params?.id
      const query = {index:id}
      const result = await documentId.findOne(query)
      res.send(result)
    })
    app.get("/abouts", async(req, res)=>{
      const query = {}
      const result = await aboutsData.find(query).toArray()
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