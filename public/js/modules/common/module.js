'use strict';

define([
    'angular',
    'angularCookies'
], function(){
    return angular.module('app.common',['ngCookies','app.user']);
});
