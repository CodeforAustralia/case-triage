module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('CasesDashboardController', CasesDashboardController);

  /*@ngInject*/
  function CasesDashboardController($scope, $log, Cases, Providers, Interactions){

    var vm = this;
    vm.filter = {};
    vm.cases = Cases.data;
    vm.service_providers = _.orderBy(Providers, ['name'], ['asc']);
    vm.interaction_types = _.orderBy(Interactions, ['id'], ['asc']);

    vm.hearing_dates = hearingDates();

    // set the colors for each service
    vm.service_providers = setColorProperty(vm.service_providers);

    vm.setProviderFilter = function(provider){
      vm.filter = provider;
    };

    function init(){
      $log.log("Loaded the cases dashboard controller");
    }

    function hearingDates(){
      var dates = [
        {date: "2016-07-04"},
        {date: "2016-06-27"},
        {date: "2016-06-20"},
        {date: "2016-06-13"},
      ];
      return dates;
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
