var bodyparser = require('body-parser');
var express    = require('express')
var path       = require('path')
var crypto     = require('crypto');
var PORT       = process.env.PORT || 3000;

// Configure MongoDB
var mongoUri = 'mongodb://' + process.env.DBUSER + ':' + process.env.DBPASS + 
               '@' + process.env.DBURL
var mongo  = require('mongodb').MongoClient;
var format = require('util').format;
var db = mongo.connect(mongoUri, function(error, dbconnection) {
    db = dbconnection;
});

// Minimum and maximum integer codes for rooms
const MIN_CODE = 1000
const MAX_CODE = 9999

// IMPORTANT NOTE: The code below refers to a "queue" heavily. We've slightly
//                 adjusted our architecture so there is no longer a serverside
//                 queue. However, we are keeping it as a list of songs that
//                 have been/are being played, with the last element being the
//                 current/last song.

express()
    .use(bodyparser.json())
    .use(bodyparser.urlencoded({extended: true}))

    // GET routes

    // This is just for fun
    .get('/', (req, res) => {
        res.send("Tunewise 😎\n\n\nCheck us out at https://github.com/ralfisalhon/TuneWise!");
    })

    // Get the next song to be played.
    // Use:        GET /upnext
    // Parameters: code - 4 digit string room code
    // Returns:    {song_uri, song_id, user_id}
    // Notes:      If song list is empty, all fields are "".
    .get('/upnext', (req, res) => {
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
                    res.send({song_uri: "", song_id: "", user_id: ""});
                } else {
                    res.send(result.queue[result.queue.length - 1]);
                }
            });
        });
    })

    // Get the emptiness of the song list.
    // Use:        GET /isempty
    // Parameters: code - 4 digit string room code
    // Returns:    "true" or "false"
    // Notes:      n/a
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

    // Get the songs in the song list.
    // Use:        GET /getlist
    // Parameters: code - 4 digit string room code
    // Returns:    [{song_uri, song_id, user_id}]
    // Notes:      n/a
    .get('/getlist', (req, res) => {
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

    // Get the players in the room
    // Use:        GET /players
    // Parameters: code - 4 digit string room code
    // Returns:    [{user_name, user_id}]
    // Notes:      n/a
    .get('/players', (req, res) => {
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
                res.send(result.users);
                return;
            });
        });
    })

    // Get the winner of the last round.
    // Use:        GET /lastwinner
    // Parameters: code - 4 digit string room code
    // Returns:    {user_id}
    // Notes:      user_id is "" if no users have won.
    .get('/lastwinner', (req, res) => {
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
                res.send({user_id: result.round.winner_id});
            });
        });
    })

    // POST routes

    // Book a room, returning the room code.
    // Use:        POST /bookroom
    // Parameters: token - Spotify access token to use
    // Returns:    {code, time_created}
    // Notes:      n/a
    .post('/bookroom', (req, res) => {
        var access_token = req.body.token;

        if (access_token == null) {
            res.status(400);
            res.send("Error: no access token provided.");
            return;
        }

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

                room = {code: room_code, 
                        token: access_token,
                        time_created: Date.now(), 
                        queue: [],
                        users: [],
                        round: {winner_id: "", is_won: "false", guesses: []}};
                collection.insertOne(room, (error, result) => {
                    res.status(200);
                    res.send({code: room_code, time_created: room.time_created});
                });
            });
        });
    })

    // Join a room, returning a "unique" user id.
    // Use:        POST /joinroom
    // Parameters: code - 4 digit string room code
    //             name - the username for the player
    // Returns:    {id, token}
    // Notes:      n/a
    .post('/joinroom', (req, res) => {
        var room_code = req.body.code;
        var name      = req.body.name;

        if (room_code == null || name == null) {
            res.status(400);
            res.send("Error: no room code or user name given.");
            return;
        }

        var id = crypto.randomBytes(16).toString('hex');
        db.collection('rooms', (error, collection) => {
            collection.findOne({code: room_code}, (error, result) => {
                if (!result) { // Validate room code.
                    res.status(400);
                    res.send("Error: invalid room code.");
                    return;
                }

                var new_users = result.users;
                new_users.push({user_name: name, user_id: id});
                collection.updateOne({code: room_code},
                                     {code: room_code,
                                      token: result.token,
                                      time_created: result.time_created,
                                      queue: result.queue,
                                      users: new_users,
                                      round: result.round}, (error, up_result) => {
                    res.status(200);
                    res.send({id: id, token: result.token});
                });
            });
        });
    })

    // Start a new round and push the song onto the list.
    // Use:        POST /startround
    // Parameters: code     - 4 digit string room code
    //             song_uri - the song URI to play
    //             song_id  - the song's Spotify ID
    //             user_id  - the id for the player choosing the song
    // Returns:    n/a
    // Notes:      Use this over POST /push for adding songs.
    .post('/startround', (req, res) => {
        var room_code = req.body.code;
        var uri       = req.body.song_uri;
        var id        = req.body.song_id;
        var u_id      = req.body.user_id;

        if (room_code == null || uri == null || id == null || u_id == null) {
            res.status(400);
            res.send("Error: no room code, song URI, song ID, or user ID supplied.");
            return;
        }

        db.collection('rooms', (error, collection) => {
            collection.findOne({code: room_code}, (error, result) => {
                if (!result) {
                    res.status(400);
                    res.send("Error: invalid room code.");
                    return;
                }

                // Validate the given user id.
                collection.findOne({'users.user_id': u_id}, (error, u_result) => {
                    if (!u_result) {
                        res.status(400);
                        res.send("Error: invalid user ID.");
                        return;
                    }

                    // Push the new song onto the list.
                    var new_queue = result.queue;
                    new_queue.push({song_uri: uri, song_id: id, user_id: u_id});

                    // Reset the round.
                    var new_round = result.round;
                    new_round.is_won = "false";
                    new_round.guesses = [];
                    collection.updateOne({code: room_code}, 
                                         {code: room_code, 
                                          token: result.token,
                                          time_created: result.time_created, 
                                          queue: new_queue,
                                          users: result.users,
                                          round: new_round}, 
                                         (error, result) => {
                        res.status(200);
                        res.send();
                    });
                });
            });
        });
    })

    // Submit a guess for a song.
    // Use:        POST /guess
    // Parameters: code     - 4 digit string room code
    //             user_id  - the id for the player guessing
    //             guess_id - the guessed song's Spotify ID
    // Returns:    {guessed, correct, someone_won, winner_id}
    // Notes:      guessed is "true" if the guess was successful (i.e. you have
    //             not used up all your guesses AND nobody else has gotten it
    //             right), "false" otherwise).
    //             correct is "true" if your guess was correct, you had a
    //             valid guess, and nobody else got it, "false" otherwise.
    //             someone_won is "true" if somebody has guessed it right,
    //             "false" otherwise.
    //             winner_id is contained in the returned JSON if and only if
    //             someone else has gotten it right. Otherwise, it is not sent
    //             back to the caller with the other fields.
    // Notes:      Use this over POST /push for adding songs. At the end of the
    //             song, everyone should call /getwinner to get the round's
    //             winner.
    //             NEEDSWORK: the returned JSON is not always the same
    //             structure (i.e. sometimes winner_id is included, sometimes
    //             not, look into a better way to do this).
    .post('/guess', (req, res) => {
        var room_code = req.body.code;
        var user_id   = req.body.user_id;
        var guess_id  = req.body.guess_id;

        if (room_code == null || user_id == null || guess_id == null) {
            res.status(400);
            res.send("Error: no room code, user ID, or guessed song ID supplied.");
            return;
        }

        db.collection('rooms', (error, collection) => {
            collection.findOne({code: room_code}, (error, result) => {
                if (!result) {
                    res.status(400);
                    res.send("Error: invalid room code.");
                    return;
                }
                collection.findOne({'users.user_id': user_id}, (error, u_result) => {
                    if (!u_result) {
                        res.status(400);
                        res.send("Error: invalid user ID.");
                        return;
                    }
                    var this_round = result.round;
                    if (result.queue.length == 0) {
                    	res.status(400);
                    	res.send("Error: no songs to play.");
                    	return;
                    }
                    var answer_id  = result.queue[result.queue.length - 1].song_id;
                    var my_guesses = 0;
                    var my_index;
                    var new_round;
                    for (my_index = 0; my_index < result.round.guesses.length; my_index++) {
                        if (user_id == result.round.guesses[my_index].user_id) {
                            my_guesses = result.round.guesses[my_index].num_guesses;
                        }
                    }

                    // Case 1: Someone has guessed it right
                    if (this_round.is_won == "true") {
                        res.status(200);
                        res.send({guessed: "false", correct: "false", someone_won: "true", winner_id: this_round.winner_id});
                        return;
                    }
                    // Case 2: I'm out of guesses
                    else if (my_guesses >= 3) {
                        res.status(200);
                        res.send({guessed: "false", correct: "false", someone_won: "false"});
                        return;
                    }
                    // Case 3: I have more guesses, but I'm wrong
                    else if (guess_id != answer_id) {
                        new_round = result.round;
                        for (my_index = 0; my_index < result.round.guesses.length; my_index++) {
                            if (user_id == result.round.guesses[my_index].user_id) {
                                break;
                            }
                        }
                        if (my_guesses == 0) {
                            new_round.guesses.push({user_id: user_id, num_guesses: 1});
                        } else {
                            my_guesses++;
                            new_round.guesses[my_index].num_guesses = my_guesses;
                        }

                        collection.updateOne({code: room_code},
                                             {code: room_code,
                                              token: result.token,
                                              time_created: result.time_created,
                                              queue: result.queue,
                                              users: result.users,
                                              round: new_round},
                                             (error, up_result) => {
                            res.status(200);
                            res.send({guessed: "true", correct: "false", someone_won: "false"});
                            return;
                        });
                    }
                    // Case 4: I have more guesses, and I'm right
                    else {
                        new_round = result.round;
                        new_round.is_won = "true";
                        new_round.winner_id = user_id;
                        new_round.guesses = [];

                        collection.updateOne({code: room_code},
                                             {code: room_code,
                                              token: result.token,
                                              time_created: result.time_created,
                                              queue: result.queue,
                                              users: result.users,
                                              round: new_round},
                                             (error, up_result) => {
                            res.status(200);
                            res.send({guessed: "true", correct: "true", someone_won: "true"});
                        });
                    }
                });                
            });
        });
    })

    // Empty the room's song list.
    // Use:        POST /empty
    // Parameters: code - 4 digit string room code
    // Returns:    n/a
    // Notes:      n/a
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
                                      token: result.token,
                                      time_created: result.time_created, 
                                      queue: [],
                                      users: result.users,
                                      round: result.round}, (error, result) => {
                    res.status(200);
                    res.send();
                });
            });
        });
    })

    // Listen on the port.
    .listen(PORT);


    // DEPRECATED API ROUTES

    // Get the next song from the list, removing it. Sends
    // {song_uri: "", song_id: "", user_id: ""} if the queue is empty.
    // Deprecated -- we are now using local queues.
    // .post('/dequeue', (req, res) => {
    //     var room_code = req.body.code;

    //     if (room_code == null) {
    //         res.status(400);
    //         res.send("Error: no room code or song URI supplied.");
    //         return;
    //     }

    //     db.collection('rooms', (error, collection) => {
    //         collection.findOne({code: room_code}, (error, result) => {
    //             if (!result) {
    //                 res.status(400);
    //                 res.send("Error: invalid room code.");
    //                 return;
    //             }

    //             res.status(200);
    //             if (result.queue.length == 0) {
    //                 res.send({song_uri: "", song_id: "", user_id: ""});
    //             } else {
    //                 var new_queue = result.queue;
    //                 var song = new_queue[0];
    //                 new_queue.shift();
    //                 collection.updateOne({code: room_code}, 
    //                                      {code: room_code, 
    //                                       time_created: result.time_created,
    //                                       queue: new_queue,
    //                                       users: result.users},
    //                                      (error, result) => {
    //                     res.send(song);
    //                 });
    //             }
    //         });
    //     });
    // })

    // Get the next element in the queue WITHOUT dequeueing it. Sends
    // {song_uri: "", song_id: "", user_id: ""} if the queue is empty.
    // Depcreted -- no longer needed, we're treating the LAST element as the
    // next song.
    // .get('/topqueue', (req, res) => {
    //     var room_code = req.query.code;

    //     if (room_code == null) {
    //         res.status(400);
    //         res.send("Error: no room code supplied.");
    //         return;
    //     }

    //     db.collection('rooms', (error, collection) => {
    //         collection.findOne({code: room_code}, (error, result) => {
    //             if (!result) {
    //                 res.status(400);
    //                 res.send("Error: invalid room code.");
    //                 return;
    //             }

    //             res.status(200);
    //             if (result.queue.length == 0) {
    //                 res.send({song_uri: "", song_id: "", user_id: ""});
    //             } else {
    //                 res.send({song_uri: result.queue[0].song_uri,
    //                           song_id: result.queue[0].song_id,
    //                           user_id: result.queue[0].user_id});
    //             }
    //         });
    //     });
    // })

    // Push a song into the room's song list.
    // Look into using POST /startround instead to push a song AND start the
    // round!
    // .post('/push', (req, res) => {
    //     var room_code = req.body.code;
    //     var uri       = req.body.song_uri;
    //     var id        = req.body.song_id;
    //     var u_id      = req.body.user_id;

    //     if (room_code == null || uri == null || id == null || u_id == null) {
    //         res.status(400);
    //         res.send("Error: no room code, song URI, song ID, or user ID supplied.");
    //         return;
    //     }

    //     db.collection('rooms', (error, collection) => {
    //         collection.findOne({code: room_code}, (error, result) => {
    //             if (!result) {
    //                 res.status(400);
    //                 res.send("Error: invalid room code.");
    //                 return;
    //             }

    //             // Validate the given user id.
    //             collection.findOne({'users.user_id': u_id}, (error, u_result) => {
    //                 if (!u_result) {
    //                     res.status(400);
    //                     res.send("Error: invalid user ID.");
    //                     return;
    //                 }

    //                 // Push the new element onto the queue.
    //                 var new_queue = result.queue;
    //                 new_queue.push({song_uri: uri, song_id: id, user_id: u_id});
    //                 collection.updateOne({code: room_code}, 
    //                                      {code: room_code, 
    //                                       token: result.token,
    //                                       time_created: result.time_created, 
    //                                       queue: new_queue,
    //                                       users: result.users,
    //                                       round: result.round}, 
    //                                      (error, result) => {
    //                     res.status(200);
    //                     res.send();
    //                 });
    //             });
    //         });
    //     });
    // })
