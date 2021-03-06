module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('OutcomesUpdateController', OutcomesUpdateController);

  /*@ngInject*/
  function OutcomesUpdateController($scope, $log, toastr, Case, CasesService){

    var vm = this;
    vm.case = Case;
    vm.model = Case;
    vm.fields = {};

    $log.log("Loading the outcomes update controller");

    vm.outcome_types = [
      {'name': 'Finalised - Full intervention order'},
      {'name': 'Finalised - Full limited intervention order'},
      {'name': 'Adjournment - Interim full intervention order'},
      {'name': 'Adjournment - Interim limited intervention order'},
      {'name': 'Adjournment - Straight'},
      {'name': 'Struck Out'},
      {'name': 'Withdrawn'}
    ];

    vm.fields.outcomes = [
      {
        name: 'outcome',
        key: 'outcome',
        type: 'select',
        templateOptions: {
          label: 'Select an outcome',
          placeholder: 'Select an outcome',
          required: true,
          options: vm.outcome_types,
          valueProp: 'name',
          labelProp: 'name',
        },
      },
      {
        key: 'adjournment_date',
        name: 'adjournment_date',
        type: 'input',
        templateOptions: {
          label: 'Adjournment Date',
          placeholder: 'Enter the date the matter was adjourned until',
          required: false,
          'bs-datepicker': 'bs-datepicker'
        },
        ngModelAttrs: {
          'bs-datepicker': {
            attribute: 'bs-datepicker'
          }
        },
        hideExpression: 'model.outcome.indexOf("Finalised") < 0'
      },
      {
        name: 'notes',
        key: 'notes',
        type: 'textarea',
        templateOptions: {
          label: 'Notes',
          placeholder: 'Notes',
        }
      }
    ];

    vm.saveOutcomes = function(){
      $log.log("Saving outcomes");
      CasesService.saveOutcomes(vm.case.meta.case_number, vm.model.outcomes);
      success("Updated the outcomes for this case");
    };

    function init(){
      $log.log("Loaded the outcomes update controller");
      $log.log(vm.model);
    }

    function success(message){
      toastr.success(message, 'Success');
    }

    init();
  }

};
