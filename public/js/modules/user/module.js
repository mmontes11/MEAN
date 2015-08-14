'use strict';

define([
    'angular',
    'angularResource',
    'base64'
], function(angular){
    return angular.module('app.user', ['ngResource','base64','app.common']);
});
