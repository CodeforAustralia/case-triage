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
      abstract: true,
      template: '<ui-view/>',
      resolve: {
        Providers: function($log, ProvidersService){
          $log.log("Resolve providers");
          return ProvidersService.all();
        },
      }
    })
  	.state('cases.index', {
  		url: '/cases',
  		templateUrl: 'js/partials/cases.index.html',
  		controller: 'CasesIndexController',
      controllerAs: 'vm',
      resolve: {
        Cases: function($log, CasesService){
          $log.log("Resolve cases");
          return CasesService.all();
        }
      }
  	})
    .state('cases.details', {
  		url: '/cases/:id',
  		templateUrl: 'js/partials/cases.details.html',
  		controller: 'CasesDetailsController',
      controllerAs: 'vm',
      resolve: {
        Case: function($log, CasesService, $stateParams){
          $log.log("Resolve case");
          return CasesService.get($stateParams.id);
        }
      }
  	})
    .state('cases.update', {
  		url: '/cases/update/:id',
  		templateUrl: 'js/partials/cases.update.html',
  		controller: 'CasesUpdateController',
      controllerAs: 'vm',
      resolve: {
        Case: function($log, CasesService, $stateParams){
          $log.log("Resolve case");
          return CasesService.get($stateParams.id);
        }
      }
  	});
  }

})();
