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
        'filters': '='
      },
      controller: CasesFiltersController,
      controllerAs: 'vm',
      bindToController: true,
      link: function(scope, elem, attrs){
      }
    };
  });

  function CasesFiltersController($log){
    var vm = this;
    vm.filters.service_providers_array = [];
    vm.all_services_toggle = false;

    vm.toggleService = function(service){
      // toggle this services value
      $log.log("toggling " + service);
      vm.filters.service_providers[service] = !vm.filters.service_providers[service];
      $log.log(vm.filters.service_providers);
      updateServiceProvidersArrayValues()
    };

    vm.toggleAllServices = function(){
      toggleServicesProviderFilters(vm.all_services_toggle);
      updateServiceProvidersArrayValues();
    };

    function toggleServicesProviderFilters(value){
      // toggle each service provider
      _(vm.filters.service_providers).each(function(service, key){
        vm.filters.service_providers[key] = value;
      });
    }

    function updateServiceProvidersArrayValues(){
      vm.filters.service_providers_array = []; // reset this filter
      _.each(vm.filters.service_providers, function(s, k){
        if (s) vm.filters.service_providers_array.push(k);
      })
    }

    function init(){
      $log.log("init the cases filters controller");
    }

    init();
  }

};
