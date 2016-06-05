/**
 * Created by 3dHealth-PC on 6/1/2016.
 */

angular.module('myApp.Login',['ngRoute']).config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/login', {
        templateUrl : 'Modules/Login/views/login.html',
        controller : 'loginController',
        controllerAs : 'vm'
    })
    $routeProvider.when('/logout', {
        templateUrl : 'Modules/Login/views/login.html',
        controller : 'loginController',
        controllerAs : 'vm',
        method : 'logOut'
    })
}])