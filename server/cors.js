module.exports = function (app) {
    app.all('*', function (req, res, next) {
        //CORS Filter
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Credentials', true);
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
        if ('OPTIONS' == req.method) return res.send(200);
        next();
    });
}