var _ = require('lodash');
var chalkColours = require('../chalk-colours');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Cases = require('../models/cases');

var seed = require('../models/cases-seed');

function transformCase(data, callback){
  var _case = new Cases();
  _case.meta = {
    case_number: data.case_number,
    list_number: data.list_number || "",
    hearing_date: data.hearing_date,
    hearing_type: data.hearing_type,
    matter: data.matter,
  };
  _case.parties = data.parties || [];
  _case.outcomes = data.outcomes || [];
  //_case.conflicts = {vla: false, fls: false};
  //_case.interactions = data.interactions || [];
  callback(null, _case);
  return _case;
}

function seedDb(data, callback){
  var c = null, cases = [];
  _.each(data, function(_case, key){
    c = {};
    // transform each case then create it
    c = transformCase(_case, createIfDoesntExist);
    cases.push(c);
    if (key == (data.length-1)) callback(null, cases);
  });
}

function createIfDoesntExist(err, _case){
  Cases.findOne({
    "meta.case_number": _case.meta.case_number,
    "meta.hearing_date": _case.meta.hearing_date
  }, function(err, case_res){
    console.info(chalkColours.warning("Seeding case " + _case.meta.case_number));
    if (err) throw Error("There was a problem searching the db - bailing on the seeder");
    if (_.isNull(case_res) || (_.isArray(case_res) && case_res.length === 0)){
      _case.save(function(err, _c){
        if (err){
          console.error(chalkColours.error(err));
          throw Error("There was a problem seeding the database");
        }
        console.log(chalkColours.success("Saved"));
      });
    }
    else
      console.error(chalkColours.error("Case already exists " + _case.meta.case_number));
  });
}

router.get('/seeder', function(req, res, next){
  console.log("SEEDING");
  if (_.isUndefined(process.env.NODE_ENV) && process.env.NODE_ENV == 'production') {
    console.error(chalkColours.error("Dont try and seed production"));
    throw Error("Page not found");
  }
  // seed the db
  console.log(seed);
  seedDb(seed, function(err, cases){
    if (!err){
      res.json(cases);
    }
  });
});


function flattenForExport(cases){

}

/* GET export all the cases */
// FILTER BY DATE RANGE??

/*
EXPORTS

Outcomes:
- case_id
- date
- outcome

Interactions:
- case_id
- date
- party
- interaction
- service

Assigned services:
- case_id
- date
- party
- service

Conflicts:
- case_id
- date
- party
- conflict(s) [vla, fls, double conflict]
*/

router.get('/export', function(req, res, next) {
  var moment = require('moment');
  var curr_date = moment().format('DD_MMMM_YYYY_h_mm_ss')
  var q = Cases.find();
  // return all cases
  q.exec(function(err, cases){
    // 404 if theres an error
    if (err) return res.sendStatus(500);
    // return all the cases otherwise
    res.json(cases);
  });
});

/* GET all resources (cases) */
// FILTER BY DATE RANGE
router.get('/', function(req, res, next) {
  var q = Cases.find();
  // return all cases
  q.exec(function(err, cases){
    // 404 if theres an error
    if (err) return res.sendStatus(500);
    // return all the cases otherwise
    res.json(cases);
  });
});

/* GET a single resource */
router.get('/:case_number', function(req, res, next) {
  var case_number = req.params.case_number;
  var q = Cases.findOne({"meta.case_number": case_number}); // case by case number
  // return all cases
  q.exec(function(err, _case){
    // 404 if theres an error
    if (err) return res.sendStatus(500);
    if (_.isNull(_case)) return res.sendStatus(404);
    // return all the cases otherwise
    res.json(_case);
  });
});

/* POST add a new resource */
router.post('/', function(req, res, next) {
  var params = req.body;
  var _case = new Cases({
    "meta": {
      "list_number": params.list_number,
      "case_number": params.case_number,
      "hearing_date": params.hearing_date,
      "hearing_type": params.hearing_type,
      "matter": params.matter,
    },
    "parties": [params.parties[0],params.parties[1]]
  });

  Cases.findOne({
    "meta.case_number": _case.meta.case_number,
    "meta.hearing_date": _case.meta.hearing_date
  }, function(err, case_res){
    if (err) throw Error(err);
    if (case_res) res.status(409).send('Case already exists');
    // save the case
    _case.save(function(err, _c){
      if (err){
        //throw Error("There was a problem saving the case");
        res.sendStatus(500);
      }
      else
        res.json(_case);
    });
  });
});

/* PUT update a resource */
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  console.log(req.body);
  var _case = req.body;
  delete _case._id;


  Cases.findByIdAndUpdate(id, _case, function(err, data){
    if (err){
      console.log(err);
      return res.sendStatus(500);
    }

    console.log(_case);
    res.json(_case);
  });
});

/* PATCH partial update a resource */
router.patch('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
