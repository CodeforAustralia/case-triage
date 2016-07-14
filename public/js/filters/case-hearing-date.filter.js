module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.filter('caseHearingDateFilter', CaseHearingDateFilter);

  /*@ngInject*/
  function CaseHearingDateFilter($log){
  	return function(cases, date){
      //date = moment(date);
      $log.log(date);
      if (!date) return cases;

      if (date && date !== "") date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();
      $log.log(date);

      return _.filter(cases, function(c){
        return c.meta.hearing_date.indexOf(date) > -1;
      });
  	};
  }

};
