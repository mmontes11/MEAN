var express = require('express'),
    router = express.Router(),
    secret = require('../../config/secret'),
    jwt = require('express-jwt'),
    user = require('./../services/user');


router
    .route('/logIn')
        .post(user.logIn);

router
    .route('/logOut')
        .get(jwt({secret: secret.secretToken}), user.logOut);

router
    .route('/signUp')
        .post(user.signUp);


module.exports = router;