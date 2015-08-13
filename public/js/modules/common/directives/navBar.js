'use strict';

define([
    '../module'
], function(module){
    module
        .directive('navBar', ['$location', function ($location) {
            return {
                restrict: "E",
                controller: "NavBarCtrl",
                templateUrl: "partials/directives/navBar.html",
                link: function (scope) {
                    scope.isActive = function (path) {
                        return path === $location.path();
                    };
                }
            };
        }]);
});