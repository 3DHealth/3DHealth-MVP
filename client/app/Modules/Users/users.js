/**
 * Created by 3dHealth-PC on 5/29/2016.
 */
'use strict';

angular.module('myApp.Users',['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
       $routeProvider.when('/user/new', {
            templateUrl : 'Modules/Users/views/new.html',
            controller : 'userController',
            controllerAs: 'vm'
        });
        $routeProvider.when('/user', {
            templateUrl : 'Modules/Users/views/user.html',
            controller : 'userController',
            controllerAs: 'vm'
        });
        $routeProvider.when('/user/:id/edit', {
            templateUrl : 'Modules/Users/views/edit.html',
            controller : 'userController',
            controllerAs: 'vm',
            method: 'edit'
        });
        $routeProvider.when('/users', {
            templateUrl : 'Modules/Users/views/user.html',
            controller : 'userController',
            controllerAs: 'vm'
        });
    }]);