// Dummy data service
(function(){
  'use strict';

  /*ngInject*/
  angular.module('njcTriage')
    .service('CasesService', CasesService);

  /*ngInject*/
  function CasesService($log, $http){
    /*var data = [
      {'id': '0001', 'case_number': 'G109487874', 'hearing_date':'2015-06-16', 'hearing_type':'FV', 'parties': ['(POL) Police Officer 1','Joe Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
      {'id': '0002', 'case_number': 'G159550863', 'hearing_date':'2015-06-16', 'hearing_type':'APPL', 'parties': ['(POL) Police Officer 3','Sue Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
      {'id': '0003', 'case_number': 'F144987884', 'hearing_date':'2015-06-16', 'hearing_type':'FV', 'parties': ['(POL) Police Officer 3','Craig Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
      {'id': '0004', 'case_number': 'G104995875', 'hearing_date':'2015-06-16', 'hearing_type':'APPL', 'parties': ['(POL) Police Officer 2','Claire Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
      {'id': '0005', 'case_number': 'F104995893', 'hearing_date':'2015-06-16', 'hearing_type':'APPL', 'parties': ['(POL) Police Officer 1','Alice Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
      {'id': '0006', 'case_number': 'G104345875', 'hearing_date':'2015-06-16', 'hearing_type':'FV', 'parties': ['(POL) Police Officer 1','Phil Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
      {'id': '0007', 'case_number': 'G124435808', 'hearing_date':'2015-06-16', 'hearing_type':'PSIO', 'parties': ['(POL) Police Officer 2','Bob Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
      {'id': '0008', 'case_number': 'F156587572', 'hearing_date':'2015-06-16', 'hearing_type':'PSIO', 'parties': ['(POL) Police Officer 2','Chelsea Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
      {'id': '0009', 'case_number': 'F456973857', 'hearing_date':'2015-06-16', 'hearing_type':'PSIO', 'parties': ['(POL) Police Officer 1','Phil Bloggs'], 'outcomes': null, 'interactions': [], 'conflicts': []},
    ];*/

    var case_list = [];

    var updateLocalCase = function(id, new_data){
      // update the item in the local case_list array
      $log.log("update the local copy of the case");
      var old_data = _.find(case_list, function(item){ return item.meta.case_number == id; });
      var key = _.findKey(case_list, old_data);
      // update the data
      case_list[key] = new_data;
      $log.log(case_list[key]);
    };

    var updateCase = function(_case){
      $log.log("updating the case");
      $log.log(_case);
      return $http
              .put("api/cases/" + _case._id, _case)
              .then(function(response){
                $log.log("Response");
                $log.log(response);
                //updateLocalCase(_case._id, _case);
                return response;
              });
    };

    return {
      all: function(){
        //$log.log("Returning all cases");
        //return data;
        return $http.get("api/cases")
        .then(function(response){
          $log.log("Cases retrieved");
          case_list = response.data;
          return response;
        });
      },
      get: function(id){
        $log.log("GET");
        $log.log(case_list);
        $log.log(id);
        //if (_.isNull(case_list) && case_list.length > 0)
        return _.find(case_list, function(item){ return item.meta.case_number == id; });
        //return $http.get("api/cases/" + id);
      },
      key: function(target){
        return _.findKey(case_list, target);
      },
      addInteraction: function(id, interaction){
        var case_info = this.byCaseNumber(id);
        case_info.interactions.push(interaction);
        return updateCase(case_info);
      },
      updateConflicts: function(id, conflicts){
        var case_info = this.get(id);
        $log.log(case_info);
        /*_.each(conflicts, function(conflict, index){
          case_info.conflicts.push(index);
        });*/
        case_info.conflicts = conflicts;
        return updateCase(case_info);
      },
      updateServices: function(id, services){
        var case_info = this.get(id);
        case_info.assigned_services = services;
        $log.log(services);
        return updateCase(case_info);
      },
      saveOutcomes: function(id, outcomes){
        var case_info = this.get(id);
        //case_info.outcomes = outcomes;
        case_info.outcomes.push({outcome: outcomes.outcome, adjournment_date: outcomes.adjournment_date, notes: outcomes.notes});
        $log.log(case_info);
        return updateCase(case_info);
      },
      update: function(id, new_data){
        // update the item in the local case_list array
        var old_data = this.get(id);
        var key = this.key(old_data);
        // push the new interactions
        $log.log(key);
        $log.log(data[key]);
        case_list[key] = new_data;
        $log.log(case_list[key]);
      }
    };
  }
})();
