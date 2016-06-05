'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'myApp.Users',
    'myApp.Clinics',
    'myApp.Login',
    'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.when('/index', {
            templateUrl : '/default.html'
            //controller : 'userController',
            //controllerAs: 'vm'
        });
        $routeProvider.otherwise({redirectTo: '/login'});
}]);
