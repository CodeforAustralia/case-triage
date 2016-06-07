module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('casesPanels', function($log){
    return {
      restrict: "EA", // element or attribute only
      replace: true, // replace the element
      templateUrl: 'js/partials/cases-panels.directive.html',
      scope: {
        'cases': '=',
        'filter': '=',
        'date': '='
      },
      link: function(scope, elem, attrs){
        $log.log("Cases panels directive");
        $log.log(scope);
        $log.log(elem);
        $log.log(attrs);
      }
    };
  });

};
