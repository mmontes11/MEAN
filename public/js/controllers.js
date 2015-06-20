'use strict';

/* Controllers */

var controllers = angular.module('controllers', []);

controllers.controller('NavBarCtrl', ['$scope', '$location', 'BrowserService', 'AuthenticationService', 'UserService', 'SocketService',
    function ($scope, $location, BrowserService, AuthenticationService, UserService, SocketService) {

        $scope.isAuthenticated = function () {
            return AuthenticationService.isAuthenticated;
        }

        $scope.logIn = function () {
            if (!AuthenticationService.isAuthenticated) {
                $location.path("/logIn");
            }
        }

        $scope.logOut = function () {
            if (AuthenticationService.isAuthenticated) {
                SocketService.emit('USER_DISCONNECTED');
                UserService.logOut()
                    .success(function (data) {
                        AuthenticationService.isAuthenticated = false;
                        BrowserService.deleteSession('token');
                        BrowserService.deleteSession('username');
                        $scope.currentUser = "";
                        $location.path("/logIn");
                    });
            }
        }

        $scope.$watch('isAuthenticated()', function (newValue, oldValue) {
            if (BrowserService.getSession('username')) {
                $scope.currentUser = BrowserService.getSession('username');
            }
        });
    }]);

controllers.controller('AdminUserCtrl',
    ['$scope', '$location', 'BrowserService', 'UserService', 'AuthenticationService', 'Config', 'SocketService',
        function AdminUserCtrl($scope, $location, BrowserService, UserService, AuthenticationService, Config, SocketService) {

            $scope.remember = false;
            $scope.notValidCredentials = false;
            $scope.userAlreadyExists = false;
            $scope.differentPasswords = false;
            $scope.isAllowedSignUp = Config.allowedSignUp;

            //Get cookies value in case that it exists
            if (BrowserService.remember('username') && BrowserService.remember('password')) {
                $scope.username = BrowserService.remember('username');
                $scope.password = BrowserService.remember('password');
                $scope.remember = true;
            }

            $scope.logIn = function (username, password) {
                if (!AuthenticationService.isAuthenticated &&
                    username != null && password != null) {

                    UserService.logIn(username, password)
                        .success(function (data) {
                            AuthenticationService.isAuthenticated = true;
                            BrowserService.setSession('token', data.token);
                            BrowserService.setSession('username', username);
                            $scope.notValidCredentials = false;
                            $location.path(Config.defaultAuthRoute);
                        })
                        .error(function (data, status) {
                            if (status >= 400) {
                                $scope.notValidCredentials = true;
                            }
                        });
                }
            }

            $scope.disableButtonLogin = function () {
                return ($scope.LogInForm.$invalid);
            }

            $scope.rememberMe = function () {
                var username = $scope.username;
                var password = $scope.password;
                if ($scope.remember) {
                    BrowserService.remember('username', username);
                    BrowserService.remember('password', password);
                } else {
                    BrowserService.forget('username');
                    BrowserService.forget('password');
                }
            };

            $scope.signUp = function (username, password, passwordConfirm) {
                if (!AuthenticationService.isAuthenticated &&
                    username != null && password != null && passwordConfirm != null) {

                    UserService.signUp(username, password, passwordConfirm)
                        .success(function (data) {
                            $scope.logIn(username, password);
                        })
                        .error(function (data, status) {
                            if (status === 500 && data.userAlreadyExists) {
                                $scope.userAlreadyExists = true;
                                return;
                            }
                            if (status >= 400) {
                                $scope.differentPasswords = true;
                                return;
                            }
                        });
                }
            }
        }
    ]);

controllers.controller('ExampleCtrl', ['$scope', 'BrowserService', 'SocketService', function ($scope, BrowserService, SocketService) {
    $scope.users = [];
    $scope.numUsers = 0;

    SocketService.emit('USER_CONNECTED', {
        username: BrowserService.getSession('username')
    });

    SocketService.on('WELCOME', function (socketData) {
        $scope.users.push(socketData.username);
        $scope.numUsers = socketData.numUsers;
        console.log("Welcome " + socketData.username + " !!!");
        console.log("Total users: " + socketData.numUsers);
    });

    SocketService.on('USER_JOINED', function (socketData) {
        $scope.users.push(socketData.username);
        $scope.numUsers = socketData.numUsers;
        console.log('User connected: ' + socketData.username);
        console.log('Total connected users: ' + socketData.numUsers);
    });

    SocketService.on('USER_LEFT', function (socketData) {
        delete $scope.users[socketData.username];
        $scope.numUsers = socketData.numUsers;
        console.log('User disconnected: ' + socketData.username);
        console.log('Total connected users: ' + socketData.numUsers);
    });
}]);
