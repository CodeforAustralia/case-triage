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
        $log.log("Case party directive");
        $log.log(scope);
        $log.log(elem);
        $log.log(attrs);
      }
    };
  });

  function CasePartyController($log, ProvidersService){
    var vm = this;
    vm.conflicted = getConflictStatus();
    vm.services = cleanupServices();
    $log.log(vm.services);

    function cleanupServices(){
      if (vm.party.assigned_services.length > 0){
        $log.log("SERVICES");
        return _.map(vm.party.assigned_services, function(service){
          return {'name':service, 'color': ProvidersService.findBgColor(service), 'shortname': ProvidersService.findShortname(service)}
        })
      }
      return [];
    }

    function getConflictStatus(){
      $log.log("Checking conflicts");
      $log.log(vm);
      var conflicted = true;
      _.each(vm.party.conflicts, function(conflict){
        if (!conflict)
          conflicted = false;
      });
      return conflicted;
    }

  }

};
