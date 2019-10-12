var bodyparser = require('body-parser');
var express    = require('express')
var path       = require('path')
var PORT       = process.env.PORT || 3000;

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
