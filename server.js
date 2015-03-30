// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb																		
var port  	 = process.env.PORT || 8080;				// set the port
var db = require('./config/configDB'); 					// load the database config
var bodyParser = require('body-parser');
var morgan  = require('morgan');
var methodOverride = require('method-override');
var jwt = require('express-jwt');

// configuration ===============================================================
mongoose.connect(db.url); 	// connect to mongoDB database 

app.use(express.static(__dirname + '/client')); 		// set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(morgan());

// routes ======================================================================
require('./server/routes.js')(app);

//headers ======================================================================
app.all('*', function(req, res, next) {
	//CORS Filter
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Credentials', true);
	res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
	res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
	if ('OPTIONS' == req.method) return res.send(200);
	next();
});

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
