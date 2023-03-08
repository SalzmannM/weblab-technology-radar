const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const bodyParser = require("body-parser");
const cors = require('cors');
const express = require("express");
const server = express();

server.use(bodyParser.json());
server.use(cors());
/* Todoo Cors */


const connectionString = "mongodb+srv://armin:armin12345@technologyradardb.q2kogyt.mongodb.net/?retryWrites=true&w=majority";

server.post('/technology', async(req, res) => {
  console.log("add Technology");
  const client = await mongoClient.connect(connectionString);
  const db = client.db('techradar');
  const collection = db.collection('technologies');
  const result = await collection.insertOne(req.body);

  res.send(result);
  res.status(201);
  res.end();
});

server.put('/technology/:id', async(req, res) => {
  console.log("update Technology");
  const client = await mongoClient.connect(connectionString);
  const db = client.db('techradar');
  const collection = db.collection('technologies');
  const result = await collection.replaceOne({_id: new ObjectId(req.params.id)}, req.body);

  res.send(result);
  res.status(201);
  res.end();
});

server.get('/technologies', async(req, res) => {
  console.log("get Technologies");
  const client = await mongoClient.connect(connectionString);
  const db = client.db('techradar');
  const collection = db.collection('technologies');
  const result = await collection.find({}).toArray();
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.send(result);
});

server.get('/technology/:id', async(req, res) => {
  console.log("get Technology");
  const client = await mongoClient.connect(connectionString);
  const db = client.db('techradar');
  const collection = db.collection('technologies');
  const result = await collection.findOne({_id: new ObjectId(req.params.id)});
  
  if (result) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.send(result);
  } else {
      res.status(404);
  }

  res.end();
});

server.post('/historyitem', async(req, res) => {
  console.log("add History Item");
  const client = await mongoClient.connect(connectionString);
  const db = client.db('techradar');
  const collection = db.collection('history');
  const result = await collection.insertOne(req.body);

  res.send(result);
  res.status(201);
  res.end();
});

server.get('/history', async(req, res) => {
  console.log("get History");
  const client = await mongoClient.connect(connectionString);
  const db = client.db('techradar');
  const collection = db.collection('history');
  const result = await collection.find({}).toArray();
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.send(result);
});

server.listen(4566, () => {
  console.log('Tech-Radar is running....');
});
