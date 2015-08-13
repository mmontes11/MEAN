'use strict';

define([
    '../app'
], function(app){
    return app.factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService, BrowserService, Config) {
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
                response: function (response) {
                    if (response != null && response.status == 200 && BrowserService.getSession('token') && !AuthenticationService.isAuthenticated) {
                        AuthenticationService.isAuthenticated = true;
                    }
                    return response || $q.when(response);
                },
                responseError: function (rejection) {
                    if (rejection != null && rejection.status === 401 && (BrowserService.getSession('token') || AuthenticationService.isAuthenticated)) {
                        BrowserService.deleteSession('token');
                        AuthenticationService.isAuthenticated = false;
                        $location.path(Config.defaultNonAuthRoute);
                    }
                    return $q.reject(rejection);
                }
            };
        })
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push('TokenInterceptor');
        }]);
});