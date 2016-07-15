module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('CasesDashboardController', CasesDashboardController);

  /*@ngInject*/
  function CasesDashboardController($scope, $log, Cases, CasesService, Providers, Interactions, TokenService){

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
    vm.export_options = [
      // should hit an api like /export?filter=param => /export?filter=all-cases
      {label: 'All data', value: 'all-data'},
      {label: 'Case assigned services', value: 'case-assigned-services'},
      {label: 'Case conflicts', value: 'case-conflicts'},
      {label: 'Case interactions', value: 'case-interactions'},
      {label: 'Case outcomes', value: 'case-outcomes'},
    ];

    vm.currentToken = function(){
      return TokenService.get();
    };

    // set the colors for each service

    vm.setProviderFilter = function(provider){
      vm.filter = provider;
    };

    vm.exportCases = function(filter){
      return CasesService.export({ filter: filter });
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
