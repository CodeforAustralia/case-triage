module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('CasesIndexController', CasesIndexController);

  /*@ngInject*/
  function CasesIndexController($scope, $log, Cases, Providers, CasesService){

    var vm = this;
    vm.filter = {};
    vm.cases = Cases.data;
    vm.providers = Providers;

    function zero_pad(str, min){
      var minlength = (typeof min !== 'undefined') ? min : 2;
      var strlen = String(str).length;
      if (strlen < minlength){
        for (var i=0;i<(minlength-strlen);i++)
          str = String("0" + str);
      }
      return String(str);
    }

    vm.hearing_dates =
      _(vm.cases)
      .map(function(c){
        $log.log("Hearing date: ");
        $log.log(c.meta.hearing_date);
        //return c.meta.hearing_date;
        var d = new Date(c.meta.hearing_date);
        $log.log(d);
        return d.getUTCFullYear() + "-" + zero_pad(d.getUTCMonth() + 1) + "-" + zero_pad(d.getUTCDate());
      })
      .uniq()
      .sort()
      .reverse()
      .value();

    vm.hearing_date = vm.hearing_dates[0];

    filterByHearingDate();
    //$log.log(vm.hearing_dates);
    //$log.log(vm.hearing_date);

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
        $log.log(vm.hearing_date);
        $log.log(c.meta.hearing_date.indexOf(vm.hearing_date));
        $log.log(c.meta.hearing_date.indexOf(vm.hearing_date) > -1);
        return c.meta.hearing_date.indexOf(vm.hearing_date) > -1;
      });
      //$log.log("CASES");
      //$log.log(vm.cases);
    }

    function init(){
      $log.log("Loaded the cases controller");
    }

    init();
  }

};
