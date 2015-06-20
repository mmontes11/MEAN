var express = require('express'),
    router = express.Router();

router
    .route('*')
        .all(function(req,res,next){
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Access-Control-Allow-Credentials', true);
            res.set('Access-Control-Allow-Methods', 'GET, POST');
            res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
            if ('OPTIONS' == req.method) return res.send(200);
            next();
        });

module.exports = router;