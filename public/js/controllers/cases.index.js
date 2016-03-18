(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcTriage')
    .controller('CasesIndexController', CasesIndexController);

  /*@ngInject*/
  function CasesIndexController($scope, $log, Cases, Providers){

    var vm = this;
    vm.filter = {};
    vm.cases = Cases.data;
    vm.providers = Providers;

    vm.setProviderFilter = function(provider){
      vm.filter = provider;
    };

    function init(){
      $log.log("Loaded the cases controller");
    }

    init();
  }

})();
