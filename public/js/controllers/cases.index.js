(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcTriage')
    .controller('CasesIndexController', CasesIndexController);

  /*@ngInject*/
  function CasesIndexController($scope, $log){

    var vm = this;

    function init(){
      $log.log("Loaded the cases controller");
    }

    init();
  }

})();
