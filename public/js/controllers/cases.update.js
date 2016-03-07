(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcTriage')
    .controller('CasesUpdateController', CasesUpdateController);

  /*@ngInject*/
  function CasesUpdateController($scope, $log, Case, Providers, CasesService, Interactions, toastr){

    $log.log(_);

    var vm = this;
    vm.case = Case;
    vm.providers = _.orderBy(Providers, ['name'], ['asc']);
    vm.interaction_types = _.orderBy(Interactions, ['id'], ['asc']);
    vm.model = {};
    vm.fields = {};

    vm.fields.conflicts = [
      {
        name: 'vla-conflict',
        key: 'vla-conflict',
        type: 'checkbox',
        templateOptions: {
          label: 'VLA',
        },
      },
      {
        name: 'fls-conflict',
        key: 'fls-conflict',
        type: 'checkbox',
        templateOptions: {
          label: 'FLS',
        },
      }
    ];

    vm.fields.interactions = [
      {
        key: 'provider',
        type: 'select',
        templateOptions: {
          label: 'Select a provider',
          placeholder: 'Select a provider',
          required: true,
          options: vm.providers,
          valueProp: 'name',
          labelProp: 'name'
        },
      },
      {
        key: 'interaction',
        type: 'multiCheckbox',
        templateOptions: {
          label: 'Select an interaction',
          placeholder: 'Select an interaction',
          required: true,
          options: vm.interaction_types,
          valueProp: 'name',
          labelProp: 'name'
        },
      },
      {
        key: 'note',
        type: 'textarea',
        templateOptions: {
          label: 'Notes',
          placeholder: 'Notes',
        }
      }

    ];

    vm.fields.services = [
      {
        key: 'services',
        type: 'multiCheckbox',
        templateOptions: {
          label:'Services',
          placeholder:'Check the services to assign to this case',
          required: true,
          options: vm.providers,
          valueProp: 'name',
          labelProp: 'name'
        }
      }
    ];

    vm.saveServices = function(){
      CasesService.updateServices(vm.case.id, vm.model.services);
      success("Updated the assigned services");
    };

    vm.saveInteraction = function(){
      vm.model.interactions.created_at = new Date(); // add a timestamp
      CasesService.addInteraction(vm.case.id, vm.model.interactions);
      vm.case.interaction = {};
      success("Saved your new interaction");
    };

    vm.saveConflicts = function(){
      CasesService.updateConflicts(vm.case.id, vm.model.conflicts);
      success("Updated the legal conflicts");
    };

    function init(){
      $log.log("Loaded the cases update controller");
    }

    function success(message){
      toastr.success(message, 'Success');
    }

    init();
  }

})();
