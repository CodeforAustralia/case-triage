module.exports = function(app){
'use strict';

app.factory('MattersService', MattersService);

/*@ngInject*/
function MattersService($log){

  var data = [
    {'label': 'Family violence'},
    {'label':'Personal Saftey Intervention Order'},
    {'label': 'Ap. For Variation'},
    {'label':'Ap. Review Reg'},
    {'label':'Ap. For Revoca'},
    {'label':'Appl For Leave'},
    {'label':'Appl For Exten'},
  ];

	return {
    all: function(){
      return data;
    }
	};
}

};
