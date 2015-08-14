// set up ======================================================================
var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    socket = require('./server/utils/socket'),
    mongoose = require('mongoose'),
    configDB = require('./config/configDB'),
    configServer = require('./config/configServer'),
    server_ip_address = process.env.OPENSHIFT_NODEJS_PORT || configServer.IP,
    server_port = process.env.OPENSHIFT_NODEJS_IP || configServer.port,
    bodyParser = require('body-parser'),
    morgan = require('morgan');


// config  ======================================================================
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/json'}));


//configure log =================================================================
if (configServer.logEnabled) {
    var log = require('./server/utils/log');
    app.use(morgan('combined', {stream: log.accessLogStream}));
}

// configDB config  ===================================================================
mongoose.connect(configDB.url);

// routes =======================================================================
var rootRouter = require('./server/routers/root');
var userRouter = require('./server/routers/user');
app.use('/', rootRouter);
app.use('/user', userRouter);

// listen (start app with node server.js) =======================================
io.sockets.on('connection', socket);
server.listen(server_port, server_ip_address, function () {
    var message = "Server listening on " + server_ip_address + ", server_port " + server_port;
    console.log(message);
});