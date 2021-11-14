
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const MONGO_URL = 'mongodb://localhost:27017/freeway-db';

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

let db = null;
let collection = null;

/*
 * Complete the startDbAndServer function, which connects to the MongoDB
 * server and creates a Node web server listening to port 3000.
 */
async function startDbAndServer() {
    db = await mongodb.connect(MONGO_URL);
    collection = db.collection('freeway');
    
    await app.listen(3000);
    console.log('Listening on port 3000');
};

startDbAndServer();