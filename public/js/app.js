module.exports = function(app){
  'use strict';
  var angular = require('angular');
  // App bootstrapping + DI
  /*@ngInject*/
  app.config(function($urlRouterProvider){
      // route the default state to the app home
      $urlRouterProvider.when('', '/cases');
      $urlRouterProvider.when('/', '/cases');
    })
    .config(function (CacheFactoryProvider, $collapseProvider) {
      angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });

      angular.extend($collapseProvider.defaults, {
        animation: 'am-flip-x'
      });
    })
    .controller('AppController', function ($log, $scope, $rootScope) {
      var main = this;

      $rootScope.user = {
        name: ""
      };

      $log.log("AppController loading");
    })
    .constant('_', window._)
    .config(function($datepickerProvider) {
      angular.extend($datepickerProvider.defaults, {
        dateFormat: 'dd/MM/yyyy',
        startWeek: 1
      });
    })
    .config(stateConfig)
    .run(function($log, $rootScope,$window,  $location, CasesService, $state, AuthService){
      $log.log("Running the app");
      $log.log("Check auth");
      $log.log("Location");
      $log.log($location);
      $log.log($location.$$host);
      /*$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if ($location.$$host !== 'localhost'){
          if (toState.authenticate && !AuthService.isAuthenticated()){
            $log.log("Not Authenticated");
            // User isn’t authenticated
            $state.transitionTo("auth.login");
            event.preventDefault();
          }
        }
      });*/
    });

  function stateConfig($stateProvider){
    $stateProvider
    .state('home', { // state for showing all movies
      url: '/',
    })
    .state('auth', {
      abstract: true,
      template: "<ui-view />"
    })
  	.state('auth.login', {
  		url: '/login',
  		templateUrl: '/triage/static/js/partials/login.html',
  		controller: 'LoginController',
      controllerAs: 'vm',
      resolve: {

      }
  	})
    .state('auth.logout', {
  		url: '/login',
  		controller: function($scope, AuthService, $state){
        AuthService
          .logout()
          .then(function(){
            $state.go('auth.login');
          });
      },
      controllerAs: 'vm',
      resolve: {

      }
  	})
    .state('cases', {
      abstract: true,
      authenticate : true,
      template: '<ui-view/>',
      resolve: {
        Providers: function($log, ProvidersService){
          $log.log("Resolve providers");
          return ProvidersService.all();
        },
        Interactions: function($log, InteractionsService){
          $log.log("Resolve interactions");
          return InteractionsService.all();
        },
        Cases: function($log, CasesService){
          $log.log("Resolve cases");
          return CasesService.all();
        }
      }
    })
  	.state('cases.index', {
  		url: '/cases',
      authenticate : true,
  		templateUrl: 'js/partials/cases.index.html',
  		controller: 'CasesIndexController',
      controllerAs: 'vm',
      resolve: {
      }
  	})
    .state('cases.new', {
      url: '/cases/new',
      authenticate : true,
      templateUrl: 'js/partials/cases.new.html',
      controller: 'CasesNewController',
      controllerAs: 'vm',
      resolve: {
        HearingTypes: function(HearingTypesService){
          return HearingTypesService.all();
        },
        Matters: function(MattersService){
          return MattersService.all();
        }
      }
    })
    .state('cases.details', {
  		url: '/cases/:id/:party',
      authenticate : true,
  		templateUrl: 'js/partials/cases.details.html',
  		controller: 'CasesDetailsController',
      controllerAs: 'vm',
      resolve: {
        Case: function($log, Cases, CasesService, $stateParams){
          $log.log("Resolve case");
          return CasesService.get($stateParams.id);
        }
      }
  	})
    .state('cases.update', {
  		url: '/cases/:id/update/:party',
      authenticate : true,
  		templateUrl: 'js/partials/cases.update.html',
  		controller: 'CasesUpdateController',
      controllerAs: 'vm',
      resolve: {
        Case: function($log, Cases, CasesService, $stateParams){
          $log.log("Resolve case");
          return CasesService.get($stateParams.id);
        }
      }
    })
    .state('outcomes', {
      abstract: true,
      authenticate : true,
      template: '<ui-view/>',
      resolve: {
        Cases: function($log, CasesService){
          $log.log("Resolve cases");
          return CasesService.all();
        }
      }
    })
  	.state('outcomes.update', {
  		url: '/outcomes/update/:id',
      authenticate : true,
  		templateUrl: 'js/partials/outcomes.update.html',
  		controller: 'OutcomesUpdateController',
      controllerAs: 'vm',
      resolve: {
        Case: function($log, Cases, CasesService, $stateParams){
          $log.log("Resolve case");
          return CasesService.get($stateParams.id);
        }
      }
  	});
  }

};
