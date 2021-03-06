module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('casesTable', function($log){
      return {
        restrict: "EA", // element or attribute only
        replace: true, // replace the element
        templateUrl: 'js/partials/cases-table.directive.html',
        scope: {
          'cases': '=',
          'filter': '='
        },
        link: function(scope, elem, attrs){
          $log.log("Cases table directive");
          $log.log(scope);
          $log.log(elem);
          $log.log(attrs);
        }
      };
    });

};
