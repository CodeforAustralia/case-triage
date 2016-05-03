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

    vm.setProviderFilter = function(provider){
      $log.log("Setting provider");
      $log.log(provider);
      vm.filter = provider.name;
    };

    function init(){
      $log.log("Loaded the cases controller");
    }

    init();
  }

};
