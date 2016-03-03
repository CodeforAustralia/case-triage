(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcTriage')
    .controller('CasesUpdateController', CasesUpdateController);

  /*@ngInject*/
  function CasesUpdateController($scope, $log, Case, Providers, CasesService){

    var vm = this;
    vm.case = Case;
    vm.providers = Providers;
    vm.interaction_types = [
      {label:'Welcome', name: 'Welcome'},
      {label:'General introduction to the NJC', name: 'General introduction to the NJC'},
      {label:'Coffee', name: 'Coffee'},
      {label:'Referral made', name: 'Referral made'},
      {label:'Consultation', name: 'Consultation'},
    ];
    vm.model = {};
    vm.fields = {};

    vm.fields.conflicts = [
      {
        name: 'vla-conflict',
        key: 'vla-conflict',
        type: 'checkbox',
        templateOptions: {
          label: 'VLA',
          required: true,
        },
      },
      {
        name: 'fls-conflict',
        key: 'fls-conflict',
        type: 'checkbox',
        templateOptions: {
          label: 'FLS',
          required: true,
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
        type: 'select',
        templateOptions: {
          label: 'Select a interaction',
          placeholder: 'Select a interaction',
          required: true,
          options: vm.interaction_types,
          valueProp: 'label',
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

    vm.saveInteraction = function(){
      vm.model.interactions.created_at = new Date(); // add a timestamp
      CasesService.addInteraction(vm.case.id, vm.model.interactions);
      vm.case.interaction = {};
    };

    vm.saveConflicts = function(){
      CasesService.updateConflicts(vm.case.id, vm.model.conflicts);
    };

    function init(){
      $log.log("Loaded the cases update controller");
    }

    init();
  }

})();
