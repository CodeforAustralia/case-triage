module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.filter('CaseHearingDateFilter', CaseHearingDateFilter);

  /*@ngInject*/
  function CaseHearingDateFilter($log){
  	return function(cases, date){
      return _.filter(cases, function(c){
        $log.log("Checking");
        $log.log(c);
        $log.log(date);
        $log.log(c.meta.hearing_date.indexOf(date));
        return c.meta.hearing_date.indexOf(date);
      });
  	};
  }

};
