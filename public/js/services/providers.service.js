// Dummy data service
module.exports = function(app){
  'use strict';

  /*ngInject*/
  app.service('ProvidersService', ProvidersService);

  /*ngInject*/
  function ProvidersService($log){
    var data = [
      {"id":1,"name":"Berry St"},
      {"id":2,"name":"St Vincents Mental Health"},
      {"id":3,"name":"Koori Justice Worker"},
      /*{"id":4,"name":"Family Law Legal Service"},*/
      {"id":5,"name":"Court Network"},
      {"id":6,"name":"Launch Housing"},
      {"id":7,"name":"Salvation Army"},
      {"id":8,"name":"Cohealth - Casework Counsellor"},
      {"id":9,"name":"Odyssey House"},
      {"id":10,"name":"Fitzroy Legal Service"},
      {"id":11,"name":"Victoria Legal Aid"},
      {"id":12,"name":"NEAMI"},
      {"id":13,"name":"Interpreter"},
      {"id":14,"name":"New Hope"},
      {"id":15,"name":"DSCV"},
      {"id":16,"name":"CSV Drug and Alchohol"},
      {"id":17,"name":"Court Officer"},
      {"id":18,"name":"Duty Worker"},
      {"id":19,"name":"Darebin community legal services"},
      {"id":20,"name":"Police prosecutors"},
      {"id":21,"name":"Client services"},
    ];

    // map the service to a colour
    var colors = {
      "Berry St":"col-1",
      "St Vincents Mental Health":"col-2",
      "Koori Justice Worker":"col-3",
      "Court Network":"col-4",
      "Launch Housing":"col-5",
      "Salvation Army":"col-6",
      "Cohealth - Casework Counsellor":"col-7",
      "Odyssey House":"col-8",
      "Fitzroy Legal Service":"col-9",
      "Victoria Legal Aid":"col-10",
      "NEAMI":"col-11",
      "Interpreter":"col-12",
      "New Hope":"col-13",
      "DSCV":"col-14",
      "CSV Drug and Alchohol":"col-15",
      "Court Officer":"col-16",
      "Duty Worker":"col-17",
      "Darebin community legal services":"col-18",
      "Police prosecutors":"col-19",
      "Client services":"col-20",
    };

    // map the service to a bg colour
    var bgColors = {
      "Berry St":"bg-col-1",
      "St Vincents Mental Health":"bg-col-2",
      "Koori Justice Worker":"bg-col-3",
      "Court Network":"bg-col-4",
      "Launch Housing":"bg-col-5",
      "Salvation Army":"bg-col-6",
      "Cohealth - Casework Counsellor":"bg-col-7",
      "CoHealth":"bg-col-7",
      "Odyssey House":"bg-col-8",
      "Fitzroy Legal Service":"bg-col-9",
      "Victoria Legal Aid":"bg-col-10",
      "NEAMI":"bg-col-11",
      "Interpreter":"bg-col-12",
      "New Hope":"bg-col-13",
      "DSCV":"bg-col-14",
      "CSV Drug and Alchohol":"bg-col-15",
      "Court Officer":"bg-col-16",
      "Duty Worker":"bg-col-17",
      "Darebin community legal services":"bg-col-18",
      "Police prosecutors":"bg-col-19",
      "Client services":"bg-col-20",
    };

    // map the service to a colour
    var abbrev = {
      "Berry St":"BS",
      "St Vincents Mental Health":"SV",
      "Koori Justice Worker":"KJ",
      "Court Network":"CN",
      "Launch Housing":"LH",
      "Salvation Army":"SA",
      "Cohealth - Casework Counsellor":"Co",
      "CoHealth":"Co",
      "Odyssey House":"OH",
      "Fitzroy Legal Service":"FL",
      "Victoria Legal Aid":"VL",
      "NEAMI":"NE",
      "Interpreter":"I",
      "New Hope":"NH",
      "DSCV":"DS",
      "CSV Drug and Alchohol":"DA",
      "Court Officer":"CO",
      "Duty Worker":"DW",
      "Darebin community legal services":"DL",
      "Police prosecutors":"PP",
      "Client services":"CS",
    };

    return {
      all: function(){
        $log.log("Returning all providers");
        return data;
      },
      allWithMetadata: function(){
        return _.map(data, function(item){
          item.color = findColor(item.name) || "";
          item.abbreviation = findAbbreviation(item.name) || "";
          return item;
        });
      },
      findBgColor: function(service){
        return bgColors[service] || "";
      },
      findColor: function(service){
        return colors[service] || "";
      },
      findShortname: function(service){
        return abbrev[service] || "";
      }
    };
  }
};
