var fs = require('fs'),
    fileStreamRotator = require('file-stream-rotator'),
    logDirectory = __dirname  + '/../log';

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = fileStreamRotator.getStream({
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false
});

exports.accessLogStream = accessLogStream;
exports.logDirectory = logDirectory;