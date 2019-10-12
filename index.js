var bodyparser = require('body-parser');
var express    = require('express')
var path       = require('path')
var PORT       = process.env.PORT || 3000;

var mongoUri = 'mongodb://' + process.env.DBUSER + ':' + process.env.DBPASS + 
               '@' + process.env.DBURL
var mongo  = require('mongodb').MongoClient;
var format = require('util').format;
var db = mongo.connect(mongoUri, function(error, dbconnection) {
    db = dbconnection;
});

const MIN_CODE = 1000
const MAX_CODE = 9999

express()
    .use(bodyparser.json())
    .use(bodyparser.urlencoded({extended: true}))

    // GET routes
    .get('/', (req, res) => {
        res.send("Hello!");
    })

    // POST routes

    // Book a room, returning the room code
    .post('/bookroom', (req, res) => {
        var room_code = Math.floor(Math.random() * (MAX_CODE - MIN_CODE + 1)) + MIN_CODE;

        db.collection('rooms', (error, collection) => {
            collection.findOne({code: room_code}, (error, result) => {
                // Generate a new random room until we don't have conflicts.
                // This isn't ideal, but this is also a hackathon
                while (result.code === room_code) {
                    room_code = string(Math.random() * (MAX_CODE - MIN_CODE) + MAX_CODE);
                }

                room = {code: room_code, time_created: Date.now()};
                collection.insertOne(room, (error, result) => {
                    res.status(200);
                    res.send(room);
                });
            })
        })
    })

    // Listen on the port.
    .listen(PORT);
