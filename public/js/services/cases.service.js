// Dummy data service
(function(){
  'use strict';

  /*ngInject*/
  angular.module('njcTriage')
    .service('CasesService', CasesService);

  /*ngInject*/
  function CasesService($scope, $log){
    var data = [

    ];

    return {
      all: function(){
        $log.log("Returning all cases");
        return data;
      }
    };
  }
})();
