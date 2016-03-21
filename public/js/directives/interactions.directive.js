(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcTriage')
    .directive('interactionsList', function($log){
      return {
        restrict: "EA", // element or attribute only
        replace: true, // replace the element
        templateUrl: 'js/partials/interactions.directive.html',
        scope: {
          'interactions': '='
        },
        link: function(scope, elem, attrs){
          $log.log("Interactions list directive");
          $log.log(scope);
          $log.log(elem);
          $log.log(attrs);
        }
      };
    });

})();
