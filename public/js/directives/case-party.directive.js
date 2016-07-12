module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('caseParty', function($log){
    return {
      restrict: "EA", // element or attribute only
      replace: true, // replace the element
      templateUrl: 'js/partials/case-party.directive.html',
      controller: CasePartyController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        'party': '=',
        'meta': '=',
      },
      link: function(scope, elem, attrs){
      }
    };
  });

  /*@ngInject*/
  function CasePartyController($log, ProvidersService){
    var vm = this;
    vm.conflicted = getConflictStatus();
    vm.services = cleanupServices();

    function cleanupServices(){
      if (vm.party.assigned_services.length > 0){
        return _.map(vm.party.assigned_services, function(service){
          return {'name':service, 'color': ProvidersService.findBgColor(service), 'shortname': ProvidersService.findShortname(service)}
        })
      }
      return [];
    }

    function getConflictStatus(){
      var conflicted = true;
      _.each(vm.party.conflicts, function(conflict){
        if (!conflict)
          conflicted = false;
      });
      return conflicted;
    }

  }

};
