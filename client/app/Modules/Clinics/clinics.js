/**
 * Created by 3dHealth-PC on 5/31/2016.
 */
angular.module('myApp.Clinics', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/clinic/new', {
            templateUrl : 'Modules/Clinics/views/new.html',
            controller : 'clinicController',
            controllerAs: 'vm'
        });
        $routeProvider.when('/clinic', {
            templateUrl : 'Modules/Clinics/views/clinic.html',
            controller : 'clinicController',
            controllerAs: 'vm'
        });
        $routeProvider.when('/clinic/:id/edit', {
            templateUrl : 'Modules/Clinics/views/edit.html',
            controller : 'clinicController',
            controllerAs: 'vm',
            method: 'edit'
        });
        $routeProvider.when('/clinics', {
            templateUrl : 'Modules/Clinics/views/clinic.html',
            controller : 'clinicController',
            controllerAs: 'vm'
        });
    }]);