module.exports = function(app){
  'use strict';

  /*ngInject*/
  app.service('InteractionsService', InteractionsService);

  /*ngInject*/
  function InteractionsService($log){
    var data = [
      {"id":1,"name":"Hospitality"},
      {"id":2,"name":"General Introduction (F2F)"},
      {"id":3,"name":"Assessment"},
      {"id":4,"name":"Information Provision"},
      {"id":5,"name":"Case Consultation"},
      {"id":6,"name":"Court Support (both 'in' & 'at')"},
      {"id":7,"name":"Service Liaison/Co-Ordination"},
      {"id":8,"name":"Assistance With Forms"},
      {"id":9,"name":"Quiet Room Allocation"},
      {"id":9,"name":"Office of housing fax"},
      {"id":11,"name":"Other"},
      {"id":12,"name":"Referral"}
    ];

    return {
      all: function(){
        $log.log("Returning all interaction types");
        return data;
      }
    };
  }
};
