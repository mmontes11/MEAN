'use strict';

/* Services */

var services = angular.module('services', ['ngResource']);

services.factory('AuthenticationService', function () {
    var auth = {
        isAuthenticated: false
    }
    return auth;
});

services.factory('UserService', function ($http, $window, $cookies, Config) {
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

services.factory('BrowserService', function ($window, $cookies) {
    return {
        getSession: function (key) {
            return $window.localStorage[key];
        },
        setSession: function (key, value) {
            $window.localStorage[key] = value;
        },
        deleteSession: function (key) {
            delete $window.localStorage[key];
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
        scrollTop: function () {
            $window.scrollTo(0, 0);
        }
    }
});

services.factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService, BrowserService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if (BrowserService.getSession('token')) {
                config.headers.Authorization = 'Bearer ' + BrowserService.getSession('token');
            }
            return config;
        },
        requestError: function (rejection) {
            return $q.reject(rejection);
        },
        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            if (response != null && response.status == 200 && BrowserService.getSession('token') && !AuthenticationService.isAuthenticated) {
                AuthenticationService.isAuthenticated = true;
            }
            return response || $q.when(response);
        },
        /* Revoke public authentication if 401 is received */
        responseError: function (rejection) {
            if (rejection != null && rejection.status === 401 && (BrowserService.getSession('token') || AuthenticationService.isAuthenticated)) {
                BrowserService.deleteSession('token');
                AuthenticationService.isAuthenticated = false;
                $location.path("/logIn");
            }
            return $q.reject(rejection);
        }
    };
});

services.factory('SocketService', function ($rootScope) {
    var socket = io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});

