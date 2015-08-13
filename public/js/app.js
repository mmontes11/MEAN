'use strict';

require([
    'angular',
    'angularRoute',
    'angularCookies',
    'angularResource',
    'angularBootstrap'
], function(angular){
    require([
        'controllers/controllers',
        'directives/directives',
        'filters/filters',
        'services/services'
    ], function(controllers,directives,filters,services){
        angular
            .module('app', ['ngRoute','ngResource','ngCookies','ui.bootstrap',controllers,directives,filters,services])
            .constant("Config", {
                'apiUrl': 'http://localhost:8080',
                'defaultNonAuthRoute': '/logIn',
                'defaultAuthRoute': '/example'
            })
            .config(['$locationProvider', '$routeProvider', function ($location, $routeProvider) {
                $routeProvider
                    .when('/logIn', {
                        templateUrl: 'partials/pages/logIn.html',
                        controller: 'AdminUserCtrl',
                        access: {requiredLogin: false}
                    })
                    .when('/signUp', {
                        templateUrl: 'partials/pages/signUp.html',
                        controller: 'AdminUserCtrl',
                        access: {requiredLogin: false},
                        name: 'signUp'
                    })
                    .when('/example', {
                        templateUrl: 'partials/pages/example.html',
                        controller: 'ExampleCtrl',
                        access: {requiredLogin: true}
                    })
                    .otherwise({redirectTo: '/'});
            }])
            .run(function ($rootScope, $location, AuthenticationService, BrowserService, Config) {
                $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
                    if (nextRoute != null && nextRoute.access != null) {
                        //Dont show signUp when not permited
                        if (nextRoute.name && nextRoute.name === 'signUp' && !Config.allowedSignUp) {
                            $location.path(Config.defaultAuthRoute);
                        }
                        //Restrict pages when not authenticated
                        if (nextRoute.access.requiredLogin && !AuthenticationService.isAuthenticated && !BrowserService.getSession('token')) {
                            $location.path(Config.defaultNonAuthRoute);
                        }
                        //Dont show logIn page or signUp when authenticated
                        if (!nextRoute.access.requiredLogin && AuthenticationService.isAuthenticated) {
                            $location.path(Config.defaultAuthRoute);
                        }
                    }
                });
                $rootScope.$on('$routeChangeSuccess', function (event, nextRoute) {
                    //Redirect to corresponding default route
                    if (!nextRoute.loadedTemplateUrl && nextRoute.redirectTo) {
                        if (!AuthenticationService.isAuthenticated && !BrowserService.getSession('token')) {
                            $location.path(Config.defaultNonAuthRoute);
                        } else {
                            $location.path(Config.defaultAuthRoute);
                        }
                    }
                });
            })
            .config(function ($httpProvider) {
                $httpProvider.interceptors.push('TokenInterceptor');
            });

        angular.bootstrap(document,['app']);
    });
});

