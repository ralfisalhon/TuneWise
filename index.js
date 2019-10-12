var bodyparser = require('body-parser');
var express    = require('express')
var path       = require('path')
var PORT       = process.env.PORT || 3000;

var mongoUri = 'mongodb://' + process.env.DBUSER + ':' + process.env.DBPASS + 
               '@' + process.env.URL
var mongo  = require('mongodb').MongoClient;
var format = require('util').format;
var db = mongo.connect(mongoUri, function(error, dbconnection) {
	db = dbconnection;
});

express()
    .use(bodyparser.json())
    .use(bodyparser.urlencoded({extended: true}))

    // GET routes
    .get('/', (req, res) => {
  		res.send("Hello!");
    })

  	// POST routes
  	.post('/rides', (req, res) => {
  		res.send("Posted!");
  	})

    // Listen on the port.
    .listen(PORT);
