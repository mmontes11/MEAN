module.exports = function(app,express,bodyParser,methodOverride,morgan){
	app.use(express.static(__dirname + '/client')); 	
	app.use(bodyParser.urlencoded({'extended':'true'})); 
	app.use(bodyParser.json()); 
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
	app.use(methodOverride('X-HTTP-Method-Override')); 
	app.use(morgan());
}