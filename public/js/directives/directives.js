'use strict';

define([
    'angular'
], function(angular){
    var moduleName = 'directives';
    angular
        .module('directives', [])
        .directive('navbar', ['$location', function ($location) {
            return {
                restrict: "E",
                controller: "NavBarCtrl",
                templateUrl: "partials/directives/navbar.html",
                link: function (scope) {
                    scope.isActive = function (path) {
                        return path === $location.path();
                    };
                }
            };
        }]);
    return moduleName;
});