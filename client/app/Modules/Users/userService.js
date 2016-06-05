/**
 * Created by 3dHealth-PC on 5/29/2016.
 */
'use strict';
angular.module('myApp.Users').service('userService', userService);

userService.$inject = ['$http'];
function userService($http){
    var handleSuccess = function(res){
        return res.data;
    };
    var handleError = function(error){
        return function(){
            return {success : false, message : error };
        };
    };

    this.Create = function(user){
        return $http.post('http://localhost:3000/users', user).then(handleSuccess, handleError('Error Create user'));
    };

    this.Get = function(id){
        return $http.get('http://localhost:3000/users?id='+id).then(handleSuccess, handleError('Error getting user by id'));
    };

    this.Update = function(user, id){
        return $http.put('http://localhost:3000/users/'+id, user).then(handleSuccess, handleError('Error update user'));
    };

    this.Delete = function(id){
        return $http.delete('http://localhost:3000/users/'+id).then(handleSuccess, handleError('Error deleting user'));
    };

    this.getAll = function(){
        return $http.get('http://localhost:3000/users/all').then(handleSuccess, handleError('Error getting all users'));
    };
}