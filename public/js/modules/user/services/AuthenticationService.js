'use strict';

define([
    '../module'
], function(module){
    module
        .factory('AuthenticationService', function () {
            var auth = {
                isAuthenticated: false
            };
            return auth;
        });
});
