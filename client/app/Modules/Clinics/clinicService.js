/**
 * Created by 3dHealth-PC on 5/29/2016.
 */
'use strict';
angular.module('myApp.Clinics').service('clinicService', clinicService);

clinicService.$inject = ['$http'];
function clinicService($http){
    var handleSuccess = function(res){
        return res.data;
    };
    var handleError = function(error){
        return function(){
            return {success : false, message : error };
        };
    };

    this.Create = function(clinic){
        return $http.post('http://localhost:3000/clinics', clinic).then(handleSuccess, handleError('Error Create clinic'));
    };

    this.Get = function(id){
        return $http.get('http://localhost:3000/clinics?id='+id).then(handleSuccess, handleError('Error getting clinic by id'));
    };

    this.Update = function(clinic, id){
        return $http.put('http://localhost:3000/clinics/'+id, clinic).then(handleSuccess, handleError('Error update clinic'));
    };

    this.Delete = function(id){
        return $http.delete('http://localhost:3000/clinics/'+id).then(handleSuccess, handleError('Error deleting clinics'));
    };

    this.getAll = function(){
        return $http.get('http://localhost:3000/clinics/all').then(handleSuccess, handleError('Error getting all clinics'));
    };
}