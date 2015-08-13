'use strict';

define([
    '../module'
], function(module){
    module
        .factory('UserService', function ($http, $window, $cookies, Config) {
            return {
                logIn: function (username, password) {
                    return $http.post(Config.apiUrl + '/user/logIn', {username: username, password: password});
                },
                logOut: function () {
                    return $http.get(Config.apiUrl + '/user/logOut');
                },
                signUp: function (username, password, passwordConfirmation) {
                    return $http.post(Config.apiUrl + '/user/signUp', {
                        username: username,
                        password: password,
                        passwordConfirmation: passwordConfirmation
                    });
                }
            }
        });
});
