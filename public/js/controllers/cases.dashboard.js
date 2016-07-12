module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('CasesDashboardController', CasesDashboardController);

  /*@ngInject*/
  function CasesDashboardController($scope, $log, Cases, Providers, Interactions){

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

    //vm.hearing_dates = hearingDates();

    // set the colors for each service
    vm.service_providers = setColorProperty(vm.service_providers);

    vm.setProviderFilter = function(provider){
      vm.filter = provider;
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

    function setColorProperty(list){
      return _.map(list, function(item, key){
        item.colour = 'col-' + (key+1);
        return item;
      });
    }

    init();
  }

};
