// Dummy data service
(function(){
  'use strict';

  /*ngInject*/
  angular.module('njcTriage')
    .service('CasesService', CasesService);

  /*ngInject*/
  function CasesService($log){
    var data = [
      {'id': '0001', 'hearing_date':'2015-06-16', 'resolved':false},
      {'id': '0002', 'hearing_date':'2015-06-16', 'resolved':false},
      {'id': '0003', 'hearing_date':'2015-06-16', 'resolved':false},
      {'id': '0004', 'hearing_date':'2015-06-16', 'resolved':false},
      {'id': '0005', 'hearing_date':'2015-06-16', 'resolved':false},
      {'id': '0006', 'hearing_date':'2015-06-16', 'resolved':false},
      {'id': '0007', 'hearing_date':'2015-06-23', 'resolved':false},
      {'id': '0008', 'hearing_date':'2015-06-23', 'resolved':false},
      {'id': '0009', 'hearing_date':'2015-06-23', 'resolved':false},
      {'id': '0010', 'hearing_date':'2015-06-23', 'resolved':false},
    ];

    return {
      all: function(){
        $log.log("Returning all cases");
        return data;
      }
    };
  }
})();
