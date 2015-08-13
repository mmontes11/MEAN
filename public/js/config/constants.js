'use strict';

define([
    '../app'
], function(app){
    return app.constant('Config', {
            'apiUrl': 'http://localhost:8080',
            'defaultNonAuthRoute': '/logIn',
            'defaultAuthRoute': '/example',
            'allowedSignUp': true
        });
});
