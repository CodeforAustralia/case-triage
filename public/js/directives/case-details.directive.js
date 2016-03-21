(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcTriage')
    .directive('caseDetails', function($log){
      return {
        restrict: "EA", // element or attribute only
        replace: true, // replace the element
        templateUrl: 'js/partials/case-details.directive.html',
        scope: {
          'case': '='
        },
        link: function(scope, elem, attrs){
          $log.log("Case details directive");
          $log.log(scope);
          $log.log(elem);
          $log.log(attrs);
        }
      };
    });

})();
