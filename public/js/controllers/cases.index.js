(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcTriage')
    .controller('CasesIndexController', CasesIndexController);

  /*@ngInject*/
  function CasesIndexController($scope, $log, Cases){

    var vm = this;
    vm.cases = Cases;

    function init(){
      $log.log("Loaded the cases controller");
    }

    init();
  }

})();
