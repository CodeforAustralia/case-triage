// Dummy data service
module.exports = function(app){
  'use strict';

  /*ngInject*/
  app.service('ProvidersService', ProvidersService);

  /*ngInject*/
  function ProvidersService($log){
    var data = [
      {"id":1,"name":"Berry St"},
      {"id":2,"name":"St Vincents Mental Health"},
      {"id":3,"name":"Koori Justice Worker"},
      {"id":4,"name":"Family Law Legal Service"},
      {"id":5,"name":"Court Network"},
      {"id":6,"name":"Launch Housing"},
      {"id":7,"name":"Salvation Army"},
      {"id":8,"name":"CoHealth"},
      {"id":9,"name":"Odyssey House"},
      {"id":10,"name":"Fitzroy Legal Service"},
      {"id":11,"name":"Victoria Legal Aid"},
      {"id":12,"name":"NEAMI"},
      {"id":13,"name":"Interpreter"},
      {"id":14,"name":"New Hope"},
      {"id":15,"name":"DSCV"},
      {"id":16,"name":"CSV Drug and Alchohol"},
      {"id":17,"name":"Court Officer"},
      {"id":18,"name":"Duty Worker"},
    ];

    return {
      all: function(){
        $log.log("Returning all providers");
        return data;
      }
    };
  }
};
