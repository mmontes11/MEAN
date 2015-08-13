'use strict';

define([
    'angular',
    'angularRoute',
    'angularBootstrap',
    './modules/common/index',
    './modules/example/index',
    './modules/user/index'
], function(angular){
    return  angular.module('app', ['ngRoute','ui.bootstrap','app.common','app.example','app.user']);
});

