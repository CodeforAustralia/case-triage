(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcTriage')
    .config(function($urlRouterProvider){
      // route the default state to the app home
      $urlRouterProvider.when('', '/cases');
      $urlRouterProvider.when('/', '/cases');
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
    .constant('_', window._)
    .config(stateConfig)
    .run(function($log, $rootScope, $location){
      $log.log("Running the app");
    });

  function stateConfig($stateProvider){
    $stateProvider
    .state('home', { // state for showing all movies
      url: '/',
    })
  	.state('cases', {
  		url: '/cases',
  		templateUrl: 'js/partials/cases.index.html',
  		controller: 'CasesIndexController',
      controllerAs: 'vm',
      resolve: {
        Providers: function($log, ProvidersService){
          $log.log("Resolve providers");
          return ProvidersService.all();
        },
        Cases: function($log, CasesService){
          $log.log("Resolve cases");
          return CasesService.all();
        }
      }
  	});
  }

})();
