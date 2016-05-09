module.exports = function(app){
'use strict';

app.factory('HearingTypesService', HearingTypesService);

/*@ngInject*/
function HearingTypesService($log){

  var data = [
    {'label': 'APPL'},
    {'label':'FV'},
    {'label': 'PSIO'},
  ];

	return {
    all: function(){
      return data;
    }
	};
}

};
