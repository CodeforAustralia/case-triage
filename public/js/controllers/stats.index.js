module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('StatsIndexController', StatsIndexController);

  /*@ngInject*/
  function StatsIndexController($scope, $log, Stats, Providers, Interactions){

    var vm = this;

    function init(){
      $log.log("Loaded the stats controller");
    }

    init();
  }

};
