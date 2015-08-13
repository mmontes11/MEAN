'use strict';

define([
   '../module'
], function(module){
    module
        .controller('AuthenticationCtrl', ['$scope', '$location', 'BrowserService', 'UserService', 'AuthenticationService', 'Config',
            function ($scope, $location, BrowserService, UserService, AuthenticationService, Config) {
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
                            .then(function (response) {
                                AuthenticationService.isAuthenticated = true;
                                BrowserService.setSession('token', response.data.token);
                                BrowserService.setSession('username', username);
                                $scope.notValidCredentials = false;
                                $location.path(Config.defaultAuthRoute);
                            }, function (response) {
                                if (response.status >= 400) {
                                    $scope.notValidCredentials = true;
                                }
                            });
                    }
                };

                $scope.disableButtonLogin = function () {
                    return ($scope.LogInForm.$invalid);
                };

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
                            .then(function () {
                                $scope.logIn(username, password);
                            }, function (response) {
                                console.log(response);
                                if (response.status === 500 && response.data.userAlreadyExists) {
                                    $scope.userAlreadyExists = true;
                                    return;
                                }
                                if (response.status >= 400) {
                                    $scope.differentPasswords = true;
                                    return;
                                }
                            });
                    }
                }
            }
        ]);
});
