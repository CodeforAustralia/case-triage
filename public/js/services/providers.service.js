// Dummy data service
(function(){
  'use strict';

  /*ngInject*/
  angular.module('njcTriage')
    .service('ProvidersService', ProvidersService);

  /*ngInject*/
  function ProvidersService($log){
    var data = [
      {'id': '0001', 'name': 'Berry St'},
      {'id': '0002', 'name': 'Launch Housing'},
      {'id': '0003', 'name': 'CourtNetwork'},
      {'id': '0004', 'name': 'CoHealth'},
      {'id': '0005', 'name': 'Fitzroy Legal Service'},
      {'id': '0006', 'name': 'Victorian Legal Aid'},
      {'id': '0007', 'name': 'Women\'s Legal Service'},
    ];

    return {
      all: function(){
        $log.log("Returning all providers");
        return data;
      }
    };
  }
})();
