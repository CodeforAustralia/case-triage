module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('CasesNewController', CasesNewController);

  /*@ngInject*/
  function CasesNewController($scope, $log, toastr, CasesService, HearingTypes, Matters){

    var vm = this;
    vm.hearing_types = [];
    vm.matters = [];

    $log.log("Hearing types");
    $log.log(HearingTypes);

    _.each(HearingTypes, function(hearing, key){
      if (hearing.type !== '')
        vm.hearing_types.push({name: hearing.label, value: hearing.label});
    });

    $log.log(Matters);

    _.each(Matters, function(matter, key){
      if (matter.type !== '')
        vm.matters.push({name: matter.label, value: matter.label});
    });

    vm.model = {};

    vm.fields = [
      {
        name: 'list_number',
        key: 'list_number',
        type: 'input',
        templateOptions: {
          label: 'List number'
        },
      },
      {
        name: 'case_number',
        key: 'case_number',
        type: 'input',
        templateOptions: {
          label: 'Case number',
          required: true
        },
      },
      {
        name: 'hearing_date',
        key: 'hearing_date',
        type: 'input',
        templateOptions: {
          label: 'Hearing date',
          required: true,
          'bs-datepicker': 'bs-datepicker',
        },
        ngModelAttrs: {
          'bs-datepicker': {attribute: 'bs-datepicker'},
        }
      },
      {
        name: 'hearing_type',
        key: 'hearing_type',
        type: 'select',
        templateOptions: {
          label: 'Hearing type',
          required: true,
          options: vm.hearing_types,
        }
      },
      {
        name: 'matter',
        key: 'matter',
        type: 'select',
        templateOptions: {
          label: 'Matter',
          required: true,
          options: vm.matters,
        }
      },
      {
        name: 'party',
        key: 'parties[0].name',
        type: 'input',
        className: 'col-xs-6',
        templateOptions: {
          label: 'Party 1',
          required: true,
        }
      },
      {
        name: 'birthday',
        key: 'parties[0].birthday',
        type: 'input',
        className: 'col-xs-3',
        templateOptions: {
          label: 'Birthday',
          'bs-datepicker': 'bs-datepicker',
        },
        ngModelAttrs: {
          'bs-datepicker': {attribute: 'bs-datepicker'},
        }
      },
      {
        name: 'age',
        key: 'parties[0].age',
        type: 'input',
        className: 'col-xs-3',
        templateOptions: {
          label: 'Age',
        }
      },
      {
        name: 'party',
        key: 'parties[1].name',
        type: 'input',
        className: 'col-xs-6',
        templateOptions: {
          label: 'Party 2',
          required: true,
        }
      },
      {
        name: 'birthday',
        key: 'parties[1].birthday',
        type: 'input',
        className: 'col-xs-3',
        templateOptions: {
          label: 'Birthday',
          'bs-datepicker': 'bs-datepicker',
        },
        ngModelAttrs: {
          'bs-datepicker': {attribute: 'bs-datepicker'},
        }
      },
      {
        name: 'age',
        key: 'parties[1].age',
        type: 'input',
        className: 'col-xs-3',
        templateOptions: {
          label: 'Age',
        }
      },
    ];

    function success(message){
      toastr.success(message, 'Success');
    }

    function error(message){
      toastr.error(message, 'Error');
    }

    vm.save = function(){
      $log.log("adding the new case");
      CasesService
        .create(vm.model)
        .then(function(){
          $log.log("SUCCESS");
          success("Added the new case");
          vm.model = {};
        }, function(){
          $log.log("FAIL");
          error("There was a problem adding the case, try again");
        });

    };


    vm.setProviderFilter = function(provider){
      vm.filter = provider;
    };

    function init(){
      $log.log("Loaded the new cases controller");
      $log.log(vm);
    }

    init();
  }

};
