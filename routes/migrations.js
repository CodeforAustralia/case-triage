var _ = require('lodash');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Cases = require('../models/cases');

function run(m, cb){
  var migrations = {
    'backup': function(){ backup(cb); },
    '_20160509caseparties': function(){ _20160509_case_parties(cb); }
  };

  // run the migration
  migrations[m]();
}

function backup(done){
  console.log("Running migration 'backup'");
  Cases.find({}, function(err, cases){
    if (err) throw Error(err);

    var folder = './dumps';

    if (!fs.existsSync(folder)) fs.mkdirSync(folder);

    var path = folder+"/backup-" + Date.now()+ ".json";
    fs.writeFile(path, JSON.stringify(cases, null, 4), function (err){
      if (err) throw Error(err);
      else {
        done();
      }
    });

  });
}

/*function _20160509_case_parties(done){
  console.log("Running migration 20160509_case_parties");
  Cases.find({}, function(err, cases){
    if (err) throw Error(err);
    _.each(cases, function(_case, key){
      process.stdout.write("\nMigrating: " + key + ".......");
      var p = _case.parties;
      _case.parties = [];
      _.each(p, function(party){
        _case.parties.push({'name':party});
      });
      _case = _.omit(_case, ['interactions', 'conflicts', 'assigned_services']);
      process.stdout.write("saving");
      _case.save(function(err, res){
        if (key == cases.length-1) done();
      });
    });
  });
}*/

/* GET users listing. */
router.get('/:migration', function(req, res, next) {
  // the demo should not allow creating / updating of content just reading
  return res.json("Read only mode for the demo :)");

  var m = req.params.migration;
  run(m, function(){
    console.log("Executing done callback");
    res.send(m + " Done");
  }); // call the migration
});

module.exports = router;
