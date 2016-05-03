module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('CasesDetailsController', CasesDetailsController);

  /*@ngInject*/
  function CasesDetailsController($scope, $log, Case, Providers, Interactions){

    var vm = this;
    vm.filter = {};
    vm.case = Case;
    vm.providers = _.orderBy(Providers, ['name'], ['asc']);
    vm.interaction_types = _.orderBy(Interactions, ['id'], ['asc']);

    vm.setProviderFilter = function(provider){
      vm.filter = provider;      
    };

    function init(){
      $log.log("Loaded the cases details controller");
    }

    init();
  }

};
