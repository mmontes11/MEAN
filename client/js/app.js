'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('app', [
  'ngRoute',
  'ngLocale',
  'ngCookies',
  'controllers',	
  'services',
  'directives',
  'filters',
  'ui.bootstrap'
]);

app.constant("Config", {
  'apiUrl': 'http://localhost:8080',
  'allowedSignUp': true,
  'defaultAuthRoute': '/logIn',
  'defaultNonAuthRoute': '/info',
})

app.config(['$locationProvider','$routeProvider', function($location,$routeProvider) {
  $routeProvider
    .when('/logIn', {
          templateUrl: 'partials/pages/logIn.html', 
          controller: 'AdminUserCtrl',
          access: { requiredLogin: false }
    })
    .when('/signUp', {
          templateUrl: 'partials/pages/signUp.html', 
          controller: 'AdminUserCtrl',
          access: { requiredLogin: false },
          name: 'signUp'
    })
    .when('/authPage', {
          templateUrl: 'partials/pages/authPage.html', 
          controller: 'AuthPageCtrl',
          access: { requiredLogin: true }
    })
    .otherwise({redirectTo: '/'});
}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});

app.run(function($rootScope, $location, AuthenticationService, BrowserService, Config) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute != null && nextRoute.access != null) {
        	//Dont show signUp when not permited
        	if (nextRoute.name && nextRoute.name === 'signUp' && !Config.allowedSignUp){
        		$location.path(Config.defaultAuthRoute);
        	}
          //Restrict pages when not authenticated
          if (nextRoute.access.requiredLogin && !AuthenticationService.isAuthenticated && !BrowserService.getSession('token')) {
            $location.path(Config.defaultAuthRoute);
          } 
          //Dont show logIn page or signnUp when authenticated
          if (!nextRoute.access.requiredLogin && AuthenticationService.isAuthenticated) { 
            $location.path(Config.defaultNonAuthRoute);
          } 
        } 
    });
    $rootScope.$on('$routeChangeSuccess', function(event, nextRoute) {
      //Redirect to corresponding default route
      if (!nextRoute.loadedTemplateUrl && nextRoute.redirectTo){
        if (!AuthenticationService.isAuthenticated && !BrowserService.getSession('token')){
          $location.path(Config.defaultAuthRoute);
        }else {
          $location.path(Config.defaultNonAuthRoute);
        }
      }
    });
});

