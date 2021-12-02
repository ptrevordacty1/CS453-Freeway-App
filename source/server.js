const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const { MongoClient } = require('mongodb');
const { default: BSON } = require('bson');
const { response } = require('express');

const MONGO_URL = 'mongodb://localhost:27017/freeway_data';

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

    const station = await freeway_stations.findOne({locationtext: body['station']});
    const cursor = await freeway_detectors.find({locationtext: body['station']});
    const startdate = body['startdate'].replace('T', ' ');
    const enddate = body['enddate'].replace('T', ' ');

    var traveltime;
    var volume = 0;
    var speedSum = 0;
    var detectors = [];
    
    while (await cursor.hasNext()) {
        const det = await cursor.next();
        detectors.push(det['detectorid']);
    }
    
    const loop = await freeway_loopdata.find({
        detectorid: {$in: detectors},
        volume: {$gt: 0},
        starttime: {$gte: startdate, $lt: enddate}
    }); 
    
    while (await loop.hasNext()) {
        const det2 = await loop.next();
        speedSum += det2['speed'] * det2['volume'];
        volume += det2['volume'];
    }

    traveltime = (station['length']/(speedSum/volume))*3600
    console.log(body);
    res.json({n: 1, ok: 1, traveltime: traveltime, volume: volume})
}
app.post('/save', jsonParser, onComputeSubmit);


async function loadStationNames(req, res) {
    const cursor = await freeway_stations.find();
    var stationnames = {};

    while (await cursor.hasNext()) {
        const station = await cursor.next();
        stationnames[station['stationid']] = station['locationtext'];
    }

    res.json({n: 1, ok: 1, stationnames: stationnames})
}
app.post('/update', jsonParser, loadStationNames);
app.post('/load', jsonParser, loadStationNames);


async function loadUpdate(req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
}
app.get('*', loadUpdate);


async function onUpdateSubmit(req, res) {
    const body = req.body;

}
app.post('/update', jsonParser, onUpdateSubmit);