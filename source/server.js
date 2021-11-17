const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const { MongoClient } = require('mongodb');
const { default: BSON } = require('bson');
const { response } = require('express');

const MONGO_URL = 'mongodb://localhost:27017/freeway-db';

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

let db = null;
let freeway_detectors = null;
let freeway_loopdata = null;
let freeway_stations = null;
let highways = null;

async function startDbAndServer() {
    db = await MongoClient.connect(MONGO_URL);
    freeway_detectors = db.collection('freeway_detectors');
    freeway_loopdata = db.collection('freeway_loopdata');
    freeway_stations = db.collection('freeway_stations');
    highways = db.collection('highways');

    await app.listen(3000, function () {
        console.log('Server listening on port 3000');
    });
};
startDbAndServer();

async function onComputeSubmit(req, res) {
    const body = req.body;
    console.log(body);
    res.json({n: 1, ok: 1})
}
app.post('/save', jsonParser, onComputeSubmit);

async function onLoadUpdate(req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
}
app.get('*', onLoadUpdate);