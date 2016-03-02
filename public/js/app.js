(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcTriage')
    .config(function($urlRouterProvider){
      // route the default state to the app home
      $urlRouterProvider.when('', '/cases');
    })
    .config(function (CacheFactoryProvider) {
      angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
    })
    .controller('AppController', function ($log, $scope, $rootScope) {
      var main = this;

      $rootScope.user = {
        name: ""
      };

      $log.log("AppController loading");
    })
    .config(stateConfig)
    .constant('_', window._)
    .run(function($log, $rootScope, $location){

    });

  function stateConfig($stateProvider){
    $stateProvider
  	.state('cases', { // state for showing all movies
  		url: '/cases',
  		templateUrl: 'js/partials/cases.index.html',
  		controller: 'CasesIndexController',
      controllerAs: 'vm',
      resolve: {

      }
  	});
  }

})();
