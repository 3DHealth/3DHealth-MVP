/**
 * Created by 3dHealth-PC on 6/1/2016.
 */
angular.module('myApp.Login').service('loginService', loginService);

loginService.$inject = ['$http'];

function loginService($http){
    var handleSuccess = function(res){
        return res.data;
    };
    var handleError = function(error){
        return function(){
            return {success : false, message : error };
        };
    };

    this.login = function(user){
        return $http.post('http://localhost:3000/login', user).then(handleSuccess, handleError('Error at Login'));
    };

    this.logout = function(){
        return $http.get('http://localhost:3000/login/logout').then(handleSuccess, handleError('Error at LogOut'))
    }
}