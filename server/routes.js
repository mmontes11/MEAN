var secret = require('../config/secret');

var routes = {};
routes.user = require('./services/user');

module.exports = function (app, jwt) {

    // API ---------------------------------------------------------------------
    //User
    app.post('/logIn', routes.user.logIn);
    app.get('/logOut', jwt({secret: secret.secretToken}), routes.user.logOut);
    app.post('/signUp', routes.user.signUp);

    // APP ---------------------------------------------------------------------
    app.get('*', function (req, res) {
        // load the single view file (angular will handle the page changes on the front-end)
        res.sendfile('./client/index.html');
    });
};