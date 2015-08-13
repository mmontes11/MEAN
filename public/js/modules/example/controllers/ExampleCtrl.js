'use strict';

define([
    '../module'
], function(module){
    module
        .controller('ExampleCtrl', ['$scope', 'BrowserService', 'SocketService', function ($scope, BrowserService, SocketService) {
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
});
