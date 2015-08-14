'use strict';

define([
    '../module'
], function(module){
    module
        .controller('NavBarCtrl', ['$scope', '$location', 'BrowserService', 'AuthenticationService', 'UserService', 'SocketService','Config',
            function ($scope, $location, BrowserService, AuthenticationService, UserService, SocketService, Config) {

                $scope.isAuthenticated = function () {
                    return AuthenticationService.isAuthenticated;
                };

                $scope.logIn = function () {
                    if (!AuthenticationService.isAuthenticated) {
                        $location.path(Config.defaultNonAuthRoute);
                    }
                };

                $scope.logOut = function () {
                    if (AuthenticationService.isAuthenticated) {
                        SocketService.emit('USER_DISCONNECTED');
                        UserService.logOut()
                            .then(function () {
                                AuthenticationService.isAuthenticated = false;
                                BrowserService.deleteSession('token');
                                BrowserService.deleteSession('username');
                                $scope.currentUser = "";
                                $location.path(Config.defaultNonAuthRoute);
                            });
                    }
                };

                $scope.$watch('isAuthenticated()', function () {
                    if (BrowserService.getSession('username')) {
                        $scope.currentUser = BrowserService.getSession('username');
                    }
                });
            }]);
});
