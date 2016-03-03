// Dummy data service
(function(){
  'use strict';

  /*ngInject*/
  angular.module('njcTriage')
    .service('CasesService', CasesService);

  /*ngInject*/
  function CasesService($log){
    var data = [
      {'id': '0001', 'hearing_date':'2015-06-16', 'client': 'Joe Bloggs', 'resolved':false, 'interactions': [{'provider':'Berry St', 'interaction':'Coffee', 'created_at':new Date()}]},
      {'id': '0002', 'hearing_date':'2015-06-16', 'client': 'John Bloggs', 'resolved':false},
      {'id': '0003', 'hearing_date':'2015-06-16', 'client': 'Phil Bloggs', 'resolved':false},
      {'id': '0004', 'hearing_date':'2015-06-16', 'client': 'Craig Bloggs', 'resolved':false, 'interactions': [{'provider':'CoHealth', 'interaction':'Coffee', 'created_at':new Date()}]},
      {'id': '0005', 'hearing_date':'2015-06-16', 'client': 'Joan Bloggs', 'resolved':false, 'interactions': [{'provider':'Salvation Army', 'interaction':'Coffee', 'created_at':new Date()}]},
      {'id': '0006', 'hearing_date':'2015-06-16', 'client': 'Claire Bloggs', 'resolved':false},
      {'id': '0007', 'hearing_date':'2015-06-23', 'client': 'Alice Bloggs', 'resolved':false},
      {'id': '0008', 'hearing_date':'2015-06-23', 'client': 'Bob Bloggs', 'resolved':false},
      {'id': '0009', 'hearing_date':'2015-06-23', 'client': 'Chelsea Bloggs', 'resolved':false},
      {'id': '0010', 'hearing_date':'2015-06-23', 'client': 'Sue Bloggs', 'resolved':false},
    ];

    return {
      all: function(){
        $log.log("Returning all cases");
        return data;
      },
      get: function(id){
        return _.find(data, {id: id});
      },
      key: function(target){
        return _.findKey(data, target);
      },
      addInteraction: function(id, interaction){
        var case_info = this.get(id);
        case_info.interactions.push(interaction);
      },
      updateConflicts: function(id, conflicts){
        var case_info = this.get(id);
        case_info.conflicts = conflicts;
      },
      update: function(id, new_data){
        $log.log("Update case");
        var old_data = this.get(id);
        var key = this.key(old_data);
        // push the new interactions
        $log.log(key);
        $log.log(data[key]);
        data[key] = new_data;
        $log.log(data[key]);
      }
    };
  }
})();
