'use strict';

/* Directives */


var directives = angular.module('directives', []);

directives.directive('navbar',['$location', function($location){
	return {
		restrict: "E",
		controller: "NavBarCtrl",
		templateUrl: "partials/directives/navbar.html",
		link: function(scope) {
			scope.isActive = function(path) {
				return path === $location.path();
			};
		}
	};	
}]);