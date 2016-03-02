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
      {label:'Referral - Internal', name: 'Referral - Internal'},
      {label:'Referral - External', name: 'Referral - External'},
      {label:'Referral - Other', name: 'Referral - Other'},
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
        },
        //ngOptions: 'option.name as option in options'
        //valueProp: 'id',
        //labelProp: 'name'
      },
      {
        key: 'interaction',
        type: 'select',
        templateOptions: {
          label: 'Select a interaction',
          placeholder: 'Select a interaction',
          required: true,
          options: vm.interaction_types,
        },
        //ngOptions: 'option.name as option in options'
        //valueProp: 'name',
        //labelProp: 'label'
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
      CasesService.update(vm.case.id, vm.case);
    };


    function init(){
      $log.log("Loaded the cases update controller");
    }

    init();
  }

})();
