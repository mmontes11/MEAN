'use strict';

define([
    '../module'
], function(module){
    module
        .factory('UserService', ['$http','$window','$cookies','$base64','Config', function ($http, $window, $cookies,$base64, Config) {
            return {
                logIn: function (username, password) {
                    return $http.post(Config.apiUrl + '/user/logIn', {username: username, password: $base64.encode(password)});
                },
                logOut: function () {
                    return $http.get(Config.apiUrl + '/user/logOut');
                },
                signUp: function (username, password, passwordConfirmation) {
                    return $http.post(Config.apiUrl + '/user/signUp', {
                        username: username,
                        password: $base64.encode(password),
                        passwordConfirmation: $base64.encode(passwordConfirmation)
                    });
                }
            }
        }]);
});
