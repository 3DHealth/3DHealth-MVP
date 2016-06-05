/**
 * Created by 3dHealth-PC on 5/31/2016.
 */
'use strict';
angular.module('myApp.Clinics').controller('clinicController', clinicController);

clinicController.$inject = ['clinicService', 'flashService', '$scope', '$location', '$route', '$filter'];

function clinicController(clinicService, flashService, $scope, $location , $route, $filter){
    var vm = this;

    this.createClinic = function(clinic){
        clinicService.Create(clinic).then(function(response){
            if(response.status == 'Success'){
                flashService.Success('Registration success', true);
                $location.path('/clinics');
            }
        });
    }

    this.getClinic = function(){
        var id = $location.search().id;
        clinicService.Get(id).then(function(response){
            if(response.status == 'Success'){
                return response;
            }
        });
    }

    var edit = function(id){
        //var id = $routeParams.id;
        clinicService.Get(id).then(function(response){
            if(response.status == 'Success'){
                vm.clinic = response.data;
                window.scrollTo(0, 0);
            }
        });
    }

    this.updateClinic = function(clinic, id){
        clinicService.Update(clinic, id).then(function(response){
            if(response.status == 'Success'){
                flashService.Success('Update success', true);
                $location.path('/clinics');
            }
        });
    }

    this.deleteClinic = function(id){
        clinicService.Delete(id).then(function(response){
            if(response.status == 'Success'){
                // flashService.Success('Removed success', true);
                $location.path('/clinics');
            }
        });
    }

    this.getClinicNames = function(){

    }

    init();

    function init() {
        if ($route.current.method !== undefined) {
            edit($route.current.params.id);
        }else{
            clinicService.getAll().then(function(response){
                if(response.status == 'Success'){
                    console.log(response);
                    $scope.clinics = response.data;
                    //  Calling routeParam method

                }
            });
        }
    }
}