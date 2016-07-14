module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('CasesDashboardController', CasesDashboardController);

  /*@ngInject*/
  function CasesDashboardController($scope, $log, Cases, CasesService, Providers, Interactions){

    var vm = this;
    vm.filters = {
      'service_providers_array': [],
      'service_providers': {},
      'keywords': '',
      'hearing_date': '' // should default to the most recent hearing date?
    };
    vm.cases = Cases.data;
    vm.service_providers = _.orderBy(Providers, ['name'], ['asc']);
    vm.interaction_types = _.orderBy(Interactions, ['id'], ['asc']);

    // set the colors for each service

    vm.setProviderFilter = function(provider){
      vm.filter = provider;
    };

    vm.exportCases = function(){
      return CasesService
        .export();
    };

    setAllProviders();

    function init(){
      $log.log("Loaded the cases dashboard controller");
    }

    function setAllProviders(){
      _(Providers)
      .each(function(provider){
        vm.filters.service_providers[provider.name] = false;
      });
    }
    
    init();
  }

};
