module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('CasesIndexController', CasesIndexController);

  /*@ngInject*/
  function CasesIndexController($scope, $log, Cases, Providers){

    var vm = this;
    vm.filter = {};
    vm.cases = Cases.data;
    vm.providers = Providers;

    $log.log(vm.cases);
    vm.hearing_dates = _.map(vm.cases, function(c){
      return c.meta.hearing_date;
    });
    $log.log("HEADING DATE");
    vm.hearing_dates = _.uniq(vm.hearing_dates);
    vm.hearing_dates = vm.hearing_dates.sort().reverse();
    vm.hearing_date = vm.hearing_dates[0];

    filterByHearingDate();
    $log.log(vm.hearing_dates);
    $log.log(vm.hearing_date);

    vm.setHearingDate = function(e){
      // update the hearing date and refilter
      $log.log("Update hearing date");
      $log.log(vm.hearing_date_model);
      //$log.log(e.currentTarget);
      vm.hearing_date = vm.hearing_date_model;
      filterByHearingDate();
    };

    vm.setProviderFilter = function(provider){
      $log.log("Setting provider");
      $log.log(provider);
      vm.filter = provider.name;
    };

    function filterByHearingDate(){
      $log.log("Filtering by date");
      $log.log(vm.hearing_date);
      vm.cases = _.filter(Cases.data, function(c){
        $log.log(c);
        return c.meta.hearing_date.indexOf(vm.hearing_date) > -1;
      });
      $log.log("CASES");
      $log.log(vm.cases);
    }

    function init(){
      $log.log("Loaded the cases controller");
    }

    init();
  }

};
