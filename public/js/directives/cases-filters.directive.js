module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('casesFilters', function($log){
    return {
      restrict: "EA", // element or attribute only
      replace: true, // replace the element
      templateUrl: 'js/partials/cases-filters.directive.html',
      scope: {
        'services': '=',
        'hearingDates': '='
      },
      controller: CasesFiltersController,
      controllerAs: 'vm',
      bindToController: true,
      link: function(scope, elem, attrs){
        $log.log("Cases filters directive");
        $log.log(scope);
        $log.log(elem);
        $log.log(attrs);
      }
    };
  });

  function CasesFiltersController($log){
    var vm = this;

    vm.filtes = {
      service_providers: [],
      hearing_date: ""
    };

    function init(){
      $log.log("init the cases filters controller");
    }

    init();
  }

};
