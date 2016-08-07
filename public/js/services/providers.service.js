// Dummy data service
module.exports = function(app){
  'use strict';

  /*ngInject*/
  app.service('ProvidersService', ProvidersService);

  /*ngInject*/
  function ProvidersService($log){
    var data = [
      {"id":1,"name":"Counselling"},
      {"id":2,"name":"Financial Support"},
      {"id":3,"name":"Housing Support"},
      {"id":4,"name":"Legal Support"},
    ];

    var colors = {
      "Counselling":"col-orange",
      "Financial Support":"col-green",
      "Housing Support":"col-red",
      "Legal Support":"col-red",
    };

    // map the service to a bg colour
    var bgColors = {
      "Counselling":"bg-col-orange",
      "Financial Support":"bg-col-green",
      "Housing Support":"bg-col-red",
      "Legal Support":"bg-col-red",
    };

    // map the service to a colour
    var abbrev = {
      "Counselling":"CO",
      "Financial Support":"FS",
      "Housing Support":"HS",
      "Legal Support":"LS",
    };

    function queryMetadata(name, source_arr){
      return source_arr[name] || "";
    }

    return {
      all: function(){
        $log.log("Returning all providers");
        return data;
      },
      allWithMetadata: function(){
        return _.map(data, function(item){
          item.colour = queryMetadata(item.name, colors);
          item.abbreviation = queryMetadata(item.name, abbrev);
          $log.log(item);
          return item;
        });
      },
      findBgColor: function(service){
        return queryMetadata(service, bgColors);
      },
      findColor: function(service){
        return queryMetadata(service, colors);
      },
      findShortname: function(service){
        return queryMetadata(service, abbrev);
      }
    };
  }
};
