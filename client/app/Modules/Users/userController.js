/**
 * Created by 3dHealth-PC on 5/29/2016.
 */
'use strict';
angular.module('myApp.Users').controller('userController', userController);

userController.$inject = ['userService', 'flashService', '$scope', '$window', '$location', '$route', '$filter', '$routeParams'];

function userController(userService, flashService, $scope, $window, $location , $route, $filter, $routeParams){
    var vm = this;

   this.createUser = function(user){
        userService.Create(user).then(function(response){
            if(response.status == 'Success'){
                flashService.Success('Registration success', true);
                $location.path('/users');
            }
        });
    }

    this.getUser = function(){
        var id = $location.search().id;
        userService.Get(id).then(function(response){
            if(response.status == 'Success'){
                return response;
            }
        });
    }

    var edit = function(id){
        //var id = $routeParams.id;
        userService.Get(id).then(function(response){
            if(response.status == 'Success'){
                vm.user = response.data;
                window.scrollTo(0, 0);
            }
        });
    }

    this.updateUser = function(user, id){
        userService.Update(user, id).then(function(response){
            if(response.status == 'Success'){
                flashService.Success('Update success', true);
                $location.path('/users');
            }
        });
    }

    this.deleteUser = function(id){
        userService.Delete(id).then(function(response){
            if(response.status == 'Success'){
               // flashService.Success('Removed success', true);
                $location.path('/users');
            }
        });
    }

    init();

    function init() {
        if ($route.current.method !== undefined) {
            edit($route.current.params.id);
        }else{
            userService.getAll().then(function(response){
                if(response.status == 'Success'){
                    console.log(response);
                    $scope.users = response.data;
                    //  Calling routeParam method

                }
            });
        }
    }
}