'use strict';

require.config({
    paths: {
        jquery: '../../bower_components/jquery/dist/jquery',
        underscore: '../../bower_components/underscore/underscore-min',
        angular: '../../bower_components/angular/angular',
        angularRoute: '../../bower_components/angular-route/angular-route.min',
        angularCookies: '../../bower_components/angular-cookies/angular-cookies.min',
        angularResource: '../../bower_components/angular-resource/angular-resource.min',
        angularBootstrap: '../../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        socketIO: '../../bower_components/socket.io-client/socket.io',
        require: '../../bower_components/requirejs/require',
        domReady: '../../bower_components/requirejs-domready/domReady'
    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        underscore: {
            exports: '_'
        },
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        angularRoute: {
            deps: ['angular']
        },
        angularCookies: {
            deps: ['angular']
        },
        angularResource: {
            deps: ['angular']
        },
        angularBootstrap: {
            deps: ['angular']
        },
        socketIO: {
            exports: 'io'
        }
    },
    deps: ['bootstrap']
});
