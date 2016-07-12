module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('CasesUpdateController', CasesUpdateController);

  /*@ngInject*/
  function CasesUpdateController($scope, $log, Case, $stateParams, Providers, CasesService, Interactions, toastr){

    var vm = this;
    vm.case = Case;
    vm.providers = _.orderBy(Providers, ['name'], ['asc']);
    vm.interaction_types = _.orderBy(Interactions, ['id'], ['asc']);
    vm.party = _.find(vm.case.parties, {'_id': $stateParams.party});
    vm.model = vm.party;

    if (vm.party){
      vm.model = _.extend(vm.party, {
        attended: vm.party.attended || false,
        age: vm.party.age || null,
        birthday: vm.party.birthday || null,
      });
    }
    else {
      vm.model = _.extend(vm.party, {
        attended: false,
        age: null,
        birthday: null,
      });
    }
    vm.interaction = {};
    vm.fields = {};

    vm.fields.meta = [
      {
        name: 'attended',
        key: 'attended',
        type: 'checkbox',
        templateOptions: {
          label: 'Did this client attend?',
        },
      },
      {
        name: 'age',
        key: 'age',
        type: 'input',
        templateOptions: {
          label: 'Age of this client',
        }
      },
      {
        name: 'birthday',
        key: 'birthday',
        type: 'input',
        templateOptions: {
          label: 'Clients birthday',
          'bs-datepicker': 'bs-datepicker',
        },
        ngModelAttrs: {
          'bs-datepicker': {attribute: 'bs-datepicker'},
        }
      },
    ];

    vm.fields.conflicts = [
      {
        name: 'vla',
        key: 'vla',
        type: 'checkbox',
        templateOptions: {
          label: 'VLA',
        },
      },
      {
        name: 'fls',
        key: 'fls',
        type: 'checkbox',
        templateOptions: {
          label: 'FLS',
        },
      }
    ];

    vm.fields.interactions = [
      {
        name: 'date',
        key: 'date',
        type: 'input',
        templateOptions: {
          label: 'Date',
          'bs-datepicker': 'bs-datepicker',
        },
        ngModelAttrs: {
          'bs-datepicker': {attribute: 'bs-datepicker'},
        }
      },
      {
        key: 'service_provider',
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
        key: 'types',
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
        key: 'notes',
        type: 'textarea',
        templateOptions: {
          label: 'Notes',
          placeholder: 'Notes',
        }
      }

    ];

    vm.fields.services = [
      {
        key: 'assigned_services',
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

    function updateParty(msg, done){
      _.each(vm.case.parties, function(v, k){
        if (v._id == vm.party._id){
          vm.party.assigned_services = vm.model.assigned_services;
          vm.party.interactions = vm.party.interactions;
          vm.party.conflicts = vm.model.conflicts;
          vm.case.parties[k] = vm.party;
        }
      });

      CasesService.update(vm.case);
      success(msg);
      if (done) done();
    }

    vm.saveServices = function(){
      CasesService.updateServices(vm.case.meta.case_number, vm.party._id, vm.model.assigned_services);
      updateParty("Updated the assigned services", null);
    };

    vm.saveInteraction = function(){
      vm.party.interactions.push(vm.interaction);
      updateParty("Saved your new interaction", function(err, res){
        vm.interaction = {};
      });
    };

    vm.saveConflicts = function(){
      updateParty("Updated the legal conflicts", null);
    };

    vm.saveMetaInformation = function(){
      updateParty("Updated the clients information", null);
    };

    function init(){
      $log.log("Loaded the cases update controller");
    }

    function success(message){
      toastr.success(message, 'Success');
    }

    init();
  }

};
