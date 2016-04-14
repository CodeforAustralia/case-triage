var fs = require('fs');
var mongoose = require('mongoose');
// console message colours
var chalk = require('chalk'); // colour our output
var chalkColours = require('./chalk-colours');

var Cases = require('./models/cases');
var args = process.argv;

// db connection
var db;
var dbName = "njc_triage";

// development error handler
// will print stacktrace
// connect to mongodb
mongoose.connect('mongodb://localhost/' + dbName);
db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
  console.log(chalkColours.success("Connected to monogodb"));
});

function saveCase(_case){

}

if (args[2]){
  // read a file thats passed in and add the cases from it to the database
  // expect the file to be json
  fs.readFile(args[2], 'utf8', function(err, case_list){
    var case_data = JSON.parse(case_list).case_list;
    var c = null;
    var case_count = 0;
    //console.log(case_data);
    case_data.forEach(function(_case, index){
      console.log(index);
      Cases.find({
        'meta.case_number': _case.case_number,
        'meta.hearing_date': _case.hearing_date,
        'meta.hearing_type': _case.hearing_type,
        'meta.matter': _case.matter,
      }, function(err, res){
        if (res.length > 0){
          console.log(chalkColours.warning('Case with identical information exists - skipping'));
          if (index == Number(case_data.length-1)) finish(case_count);          
        }
        else {
          c = null;
          c = new Cases({
            meta: {
              case_number: _case.case_number,
              hearing_date: _case.hearing_date,
              hearing_type: _case.hearing_type,
              matter: _case.matter
            },
            parties: _case.parties || [],
            conflicts: _case.conflicts || {},
            interactions: _case.interactions || [],
            assigned_services: _case.assigned_services || [],
            outcomes: _case.outcomes || []
          });

          c.save(function(err){
            if (err){
              console.log(chalkColours.error("There was a problem seeding the db with the case below - bailing"));
              console.log(_case);
              finish();
            }

            case_count++;
            if (index == Number(case_data.length-1)) finish(case_count);
          });
        }

      });


    });

  });
}
else {
  console.log(chalkColours.error("No file specified - Bailing"));
  finish();
}

function finish(count){
  console.log("FINISHED");
  if (typeof count !== 'undefined') console.log(chalkColours.success("Seeded " + count + " cases"));
  process.exit(0);
}
