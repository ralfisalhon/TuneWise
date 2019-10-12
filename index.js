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

    // This is just for fun
    .get('/', (req, res) => {
        res.send("Tune Wire B)");
    })

    // Get the next element in the queue WITHOUT dequeueing it. Sends
    // {song_uri: ""} if the queue is empty.
    .get('/topqueue', (req, res) => {
        var room_code = req.query.code;

        if (room_code == null) {
            res.status(400);
            res.send("Error: no room code supplied.");
            return;
        }

        db.collection('rooms', (error, collection) => {
            collection.findOne({code: room_code}, (error, result) => {
                if (!result) {
                    res.status(400);
                    res.send("Error: invalid room code.");
                    return;
                }

                res.status(200);
                if (result.queue.length == 0) {
                    res.send({song_uri: ""});
                } else {
                    res.send({song_uri: result.queue[0]});
                }
            });
        });
    })

    // Get the emptiness of the queue.
    .get('/isempty', (req, res) => {
        var room_code = req.query.code;

        if (room_code == null) {
            res.status(400);
            res.send("Error: no room code supplied.");
            return;
        }

        db.collection('rooms', (error, collection) => {
            collection.findOne({code: room_code}, (error, result) => {
                if (!result) {
                    res.status(400);
                    res.send("Error: invalid room code.");
                    return;
                }

                res.status(200);
                res.send(result.queue.length == 0 ? "true" : "false");
            });
        });
    })

    // Get the queued songs
    .get('/getqueue', (req, res) => {
        var room_code = req.query.code;

        if (room_code == null) {
            res.status(400);
            res.send("Error: no room code supplied.");
            return;
        }

        db.collection('rooms', (error, collection) => {
            collection.findOne({code: room_code}, (error, result) => {
                if (!result) {
                    res.status(400);
                    res.send("Error: invalid room code.");
                    return;
                }

                res.status(200);
                res.send(result.queue);
            });
        });
    })

    // POST routes

    // Book a room, returning the room code
    .post('/bookroom', (req, res) => {
        var room_code = (Math.floor(Math.random() * (MAX_CODE - MIN_CODE + 1)) + MIN_CODE).toString();

        db.collection('rooms', (error, collection) => {
            collection.findOne({code: room_code}, (error, result) => {
                // Generate a new random room until we don't have conflicts.
                // This isn't ideal, but this is also a hackathon
                if (result) {
                    while (result.code === room_code) {
                        // Remove rooms older than 4 hours
                        if (result.time_created > (Date.now() - (4 * 1000 * 60 * 60))) {
                            break;
                        }
                        room_code = (Math.random() * (MAX_CODE - MIN_CODE) + MAX_CODE).toString();
                    }
                }

                room = {code: room_code, time_created: Date.now(), queue: []};
                collection.insertOne(room, (error, result) => {
                    res.status(200);
                    res.send({code: room_code, time_created: room.time_created});
                });
            });
        });
    })

    // Enqueue a song into the room's song queue
    .post('/enqueue', (req, res) => {
        var room_code = req.body.code;
        var song_uri = req.body.song_uri;

        if (room_code == null || song_uri == null) {
            res.status(400);
            res.send("Error: no room code or song URI supplied.");
            return;
        }

        db.collection('rooms', (error, collection) => {
            collection.findOne({code: room_code}, (error, result) => {
                if (!result) {
                    res.status(400);
                    res.send("Error: invalid room code.");
                    return;
                }

                var new_queue = result.queue;
                new_queue.push(song_uri);
                collection.updateOne({code: room_code}, 
                                     {code: room_code, 
                                      time_created: result.time_created, 
                                      queue: new_queue}, 
                                     (error, result) => {
                    res.status(200);
                    res.send();
                });
            });
        });
    })

    // Get the next song from the queue, removing it. Sends
    // {song_uri: ""} if the queue is empty.
    .post('/dequeue', (req, res) => {
        var room_code = req.body.code;

        if (room_code == null) {
            res.status(400);
            res.send("Error: no room code or song URI supplied.");
            return;
        }

        db.collection('rooms', (error, collection) => {
            collection.findOne({code: room_code}, (error, result) => {
                if (!result) {
                    res.status(400);
                    res.send("Error: invalid room code.");
                    return;
                }

                res.status(200);
                if (result.queue.length == 0) {
                    res.send({song_uri: ""});
                } else {
                    var new_queue = result.queue;
                    var song = new_queue[0];
                    new_queue.shift();
                    collection.updateOne({code: room_code}, 
                                         {code: room_code, 
                                          time_created: result.time_created,
                                          queue: new_queue},
                                         (error, result) => {
                        res.send({song_uri: song});
                    });
                }
            });
        });
    })

    // Empty the room's queue.
    .post('/empty', (req, res) => {
        var room_code = req.body.code;

        if (room_code == null) {
            res.status(400);
            res.send("Error: no room code or song URI supplied.");
            return;
        }

        db.collection('rooms', (error, collection) => {
            collection.findOne({code: room_code}, (error, result) => {
                if (!result) {
                    res.status(400);
                    res.send("Error: invalid room code.");
                    return;
                }

                collection.updateOne({code: room_code}, 
                                     {code: room_code, 
                                      time_created: result.time_created, 
                                      queue: []}, (error, result) => {
                    res.status(200);
                    res.send();
                });
            });
        });
    })

    // Listen on the port.
    .listen(PORT);
