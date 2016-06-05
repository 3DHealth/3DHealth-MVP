/**
 * Created by 3dHealth-PC on 6/1/2016.
 */
angular.module('myApp.Login').controller('loginController', loginController);
loginController.$inject = ['loginService', 'flashService', '$scope', '$location', '$rootScope', '$route', '$http'];

function loginController(loginService,flashService, $scope, $location, $rootScope, $route, $http){
    var vm = this;
     this.logIn = function(user){
         loginService.login(user).then(function(response){
             if(response.status == 'Success'){
                 var id = response.body.token ;
                 $rootScope['mainObj'] = response.body;

                 /*angular.module('myApp').run(function($http) {

                     $http.defaults.headers.common.Authorization = id ;
                     //or try this
                     //$http.defaults.headers.common['Auth-Token'] = id;

                 });*/

                 $http.defaults.headers.common['Authorization'] = id;

                 $location.path('/index');
             }
         });
     }

    logOut = function(){
        loginService.logout().then(function(response){
            if(response.status == 'Success'){
                $rootScope['mainObj'] = null;
                $location.path('/login');
            }
        });
    }

    init();

    function init() {
        if ($route.current.method !== undefined) {
            logOut();
        }
    }
}