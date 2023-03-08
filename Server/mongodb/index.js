const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const express = require('express');
const server = express();

server.use(bodyParser.json());

const connectionString = 'mongodb+srv://armin:armin12345@technologyradardb.q2kogyt.mongodb.net/?retryWrites=true&w=majority';

(async function() {
  let client;

  let newTechnology = {
    name: "TestNam",
    category: "TestCat",
    description: "Testdesc",
    ring: "TestRin",
    classification: "TestCla",
    published: false
  };

  try {
    client = await MongoClient.connect(connectionString);
    console.log('Connected correctly to server');
    const db = client.db('techradar');
    let r = await db.collection('technologies').insertOne(newTechnology);
    console.log(r);
  } catch(err) {
    console.log(err);
  } finally {
    client.close();
  }
})();

server.listen(4566, () => {
  console.log('Tech-Radar is running....');
});