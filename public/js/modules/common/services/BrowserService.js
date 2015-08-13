'use strict';

define([
    '../module'
], function(module){
    module
        .factory('BrowserService', function ($window, $cookies) {
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
});