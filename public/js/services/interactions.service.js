// Dummy data service
(function(){
  'use strict';

  /*ngInject*/
  angular.module('njcTriage')
    .service('InteractionsService', InteractionsService);

  /*ngInject*/
  function InteractionsService($log){
    var data = [
      {"id":1,"name":"General introduction"},
      {"id":2,"name":"Hospitality"},
      {"id":3,"name":"Referral"},
      {"id":4,"name":"Court Support"},
      {"id":5,"name":"Provision of information"},
      {"id":6,"name":"Case consult"},
      {"id":7,"name":"Allocate a quiet room"},
      {"id":8,"name":"Other"}
    ];

    return {
      all: function(){
        $log.log("Returning all interaction types");
        return data;
      }
    };
  }
})();
