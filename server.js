// set up ======================================================================
var express  = require('express'),
	app      = express(), 
	http = require('http'),
	server = http.createServer(app),
	io = require('socket.io').listen(server),
	socket = require('./server/socket')						
	mongoose = require('mongoose'), 																							
	port  	 = process.env.PORT || 8080,			
	db = require('./config/configDB'),				
	bodyParser = require('body-parser'),
	morgan  = require('morgan'),
	methodOverride = require('method-override'),
	jwt = require('express-jwt');

// config  ======================================================================
require('./config/config.js')(app,express,bodyParser,methodOverride,morgan);

// db config  ===================================================================
mongoose.connect(db.url); 

// routes =======================================================================
require('./server/routes.js')(app,jwt);

//cors ==========================================================================
require('./server/cors.js')(app);

// listen (start app with node server.js) =======================================
io.sockets.on('connection', socket);
server.listen(port);
console.log("Server listening on port " + port);
