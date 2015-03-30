'use strict';

/* Services */

var services = angular.module('services', ['ngResource']);

services.factory('AuthenticationService', function() {
    var auth = {
        isAuthenticated: false
    }
    return auth;
});

services.factory('UserService', function($http,$window,$cookies,Config) {
    return {
        logIn: function(username, password) {
            return $http.post(Config.apiUrl  + '/logIn', {username: username, password: password});
        },
        logOut: function() {
            return $http.get(Config.apiUrl  + '/logOut');
        },
        signUp: function(username, password, passwordConfirmation) {
            return $http.post(Config.apiUrl  + '/signUp', {username: username, password: password, passwordConfirmation: passwordConfirmation });
        }
    }
});

services.factory('BrowserService', function($window,$cookies){
    return {
        getSession: function (key){
            return $window.sessionStorage[key];
        },
        setSession: function(key,value){
            $window.sessionStorage[key] = value;
        },
        deleteSession: function(key){
            delete $window.sessionStorage[key];
        },
        remember: function (key, value) {
            if (arguments.length === 1) {
                return $cookies[key];
            }
            $cookies[key] = value || '';
        },
        forget: function (name) {
            delete $cookies[name];
        },
        scrollTop: function (){
            $window.scrollTo(0, 0);
        }
    }
});

services.factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        requestError: function(rejection) {
            return $q.reject(rejection);
        },
        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated) {
                AuthenticationService.isAuthenticated = true;
            }
            return response || $q.when(response);
        },
        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
                delete $window.sessionStorage.token;
                AuthenticationService.isAuthenticated = false;
                $location.path("/logIn");
            }
            return $q.reject(rejection);
        }
    };
});

