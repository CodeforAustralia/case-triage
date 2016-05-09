// Dummy data service
module.exports = function(app){
  'use strict';

  /*ngInject*/
  app.service('CasesService', CasesService);

  /*ngInject*/
  function CasesService($log, $http){
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
      create: function(_case){
        return $http.post("api/cases", _case);
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
        var case_info = this.get(id);
        $log.log("Add interaction");
        case_info.interactions.push({
          service_provider: interaction.service_provider,
          types: interaction.types,
          notes: interaction.notes
        });
        $log.log(case_info);
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
};
