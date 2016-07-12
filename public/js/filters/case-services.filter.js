module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.filter('caseServicesFilter', CaseServicesFilter);

  /*@ngInject*/
  function CaseServicesFilter($log){
  	return function(cases, services_array){
      // filter the cases to only show the cases that match the set of services provided
      //var services_array = createServicesArray(services_list);
      if (services_array.length < 1) return cases; // show all if there are no services filtered
      //return cases;
      return _.filter(cases, function(c){
        //return true;
        return checkCaseHasServices(c, services_array);
      });
  	};
  }

  function checkCaseHasServices(c, services_arr){
    var checking = true;
    var counter = 0;
    var has_service  = false;
    // check if either of the cases parties has this service assigned to them
    while (checking && counter < services_arr.length){
      if (partyHasService(services_arr[counter], c.parties[0]) || partyHasService(services_arr[counter], c.parties[1])){
        has_service = true;
        checking = false;
      }
      counter++;
    }
    return has_service;
  }

  function partyHasService(service, party){
    return party.assigned_services.indexOf(service) > -1;
  }

};
