'use strict';

define([
    '../app'
], function(app){
    return app.config(['$locationProvider', '$routeProvider', function ($location, $routeProvider) {
            $routeProvider
                .when('/logIn', {
                    templateUrl: 'partials/user/logIn.html',
                    controller: 'AuthenticationCtrl',
                    access: {requiredLogin: false}
                })
                .when('/signUp', {
                    templateUrl: 'partials/user/signUp.html',
                    controller: 'AuthenticationCtrl',
                    access: {requiredLogin: false},
                    name: 'signUp'
                })
                .when('/example', {
                    templateUrl: 'partials/example/example.html',
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
                    //Restrict user when not authenticated
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
        });
});