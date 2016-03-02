(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcTriage')
    .controller('CasesDetailsController', CasesDetailsController);

  /*@ngInject*/
  function CasesDetailsController($scope, $log, Cases, Providers){

    var vm = this;
    vm.filter = {};
    vm.cases = Cases;
    vm.providers = Providers;

    vm.setProviderFilter = function(provider){
      vm.filter = provider;
    };

    function init(){
      $log.log("Loaded the cases details controller");
    }

    init();
  }

})();
