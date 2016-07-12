module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('casesList', function($log){
    return {
      restrict: "EA", // element or attribute only
      replace: true, // replace the element
      templateUrl: 'js/partials/cases-list.directive.html',
      controller: CasesListsController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        'filters': '=',
        'cases': '=',
      },
      link: function(scope, elem, attrs){
        $log.log("Cases list directive");
        $log.log(scope);
        $log.log(elem);
        $log.log(attrs);
      }
    };
  });

  /*@ngInject*/
  function CasesListsController($log){
    var vm = this;
  }

};
