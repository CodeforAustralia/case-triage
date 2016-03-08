// Dummy data service
(function(){
  'use strict';

  /*ngInject*/
  angular.module('njcTriage')
    .service('CasesService', CasesService);

  /*ngInject*/
  function CasesService($log){
    var data = [
      {'id': '0001', 'case_number': 'G109487874', 'hearing_date':'2015-06-16', 'hearing_type':'FV', 'parties': ['(POL) Police Officer 1','Joe Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
      {'id': '0002', 'case_number': 'G159550863', 'hearing_date':'2015-06-16', 'hearing_type':'APPL', 'parties': ['(POL) Police Officer 3','Sue Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
      {'id': '0003', 'case_number': 'F144987884', 'hearing_date':'2015-06-16', 'hearing_type':'FV', 'parties': ['(POL) Police Officer 3','Craig Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
      {'id': '0004', 'case_number': 'G104995875', 'hearing_date':'2015-06-16', 'hearing_type':'APPL', 'parties': ['(POL) Police Officer 2','Claire Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
      {'id': '0005', 'case_number': 'F104995893', 'hearing_date':'2015-06-16', 'hearing_type':'APPL', 'parties': ['(POL) Police Officer 1','Alice Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
      {'id': '0006', 'case_number': 'G104345875', 'hearing_date':'2015-06-16', 'hearing_type':'FV', 'parties': ['(POL) Police Officer 1','Phil Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
      {'id': '0007', 'case_number': 'G124435808', 'hearing_date':'2015-06-16', 'hearing_type':'PSIO', 'parties': ['(POL) Police Officer 2','Bob Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
      {'id': '0008', 'case_number': 'F156587572', 'hearing_date':'2015-06-16', 'hearing_type':'PSIO', 'parties': ['(POL) Police Officer 2','Chelsea Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
      {'id': '0009', 'case_number': 'F456973857', 'hearing_date':'2015-06-16', 'hearing_type':'PSIO', 'parties': ['(POL) Police Officer 1','Phil Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
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
        _.each(conflicts, function(conflict, index){
          case_info.conflicts.push(index);
        });
      },
      updateServices: function(id, services){
        var case_info = this.get(id);
        case_info.services = services;
      },
      saveOutcomes: function(id, outcomes){
        var case_info = this.get(id);
        case_info.outcomes = outcomes;
      },
      update: function(id, new_data){
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
