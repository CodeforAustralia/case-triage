var _ = require('lodash');
var chalkColours = require('../chalk-colours');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Cases = require('../models/cases');
var json2csv = require('json2csv');
var moment = require('moment');

/*
EXPORTS

aggregates:
db.cases.aggregate([{$match: {"meta.hearing_date": ISODate("2016-07-19")}}, { $unwind: "$parties.assigned_services"}]).pretty();

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
// TODO: this is gross
var exportFields = {
  id: {label: 'id', value: '_id', default: 'NULL'},
  case_number: {label: 'case_number', value: 'meta.case_number', default: 'NULL'},
  matter: {label: 'matter', value: 'meta.matter', default: 'NULL'},
  hearing_date: {label: 'hearing_date', value: function(row){
    return moment(row.meta.hearing_date).format("YYYY-MM-DD");
  }, default: 'NULL'},
  hearing_type: {label: 'hearing_type', value: 'meta.hearing_type', default: 'NULL'},
  conflicts: {label: 'conflicts', value: function(row){
    if (row.parties.conflicts.vla && row.parties.conflicts.fls){
      return "double conflict".toUpperCase();
    }
    else {
      if (row.parties.conflicts.vla) return "VLA";
      if (row.parties.conflicts.fls) return "FLS";
    }
  }, default: 'NULL'},
  party: {label: 'party', value: 'parties.name', default: 'NULL'},
  party_attended: {label: 'attended', value: 'parties.attended', default: 'NULL'},
  assigned_services: {label: 'assigned_services', value: 'parties.assigned_services', default: 'NULL'},
  interaction_service: {label: 'interaction_service', value: 'parties.interactions.service_provider', default: 'NULL'},
  interaction_service_type: {label: 'interaction_service_type', value: 'parties.interactions.types', default: 'NULL'},
  interaction_notes: {label: 'interaction_notes', value: 'parties.interactions.notes', default: 'NULL'},
  outcome: {label: 'outcome', value: 'outcomes.outcome', default: 'NULL'},
  outcome_notes: {label: 'outcome_notes', value: 'outcomes.notes', default: 'NULL'},
};

var exportType = {
  // should be a flat list of all the cases
  'all-data': [
    exportFields['case_number'], exportFields['matter'],
    exportFields['hearing_date'], exportFields['hearing_type'],
    exportFields['conflicts'],
    exportFields['party'], exportFields['party_attended'],
    exportFields['assigned_services'], exportFields['interaction_service'], exportFields['interaction_service_type'], exportFields['interaction_notes'],
    exportFields['outcome'], exportFields['outcome_notes'],
  ],
  'case-assigned-services': [
    exportFields['case_number'],
    exportFields['hearing_date'],
    exportFields['party'],
    exportFields['assigned_services'],
  ],
  'case-conflicts': [
    exportFields['case_number'],
    exportFields['hearing_date'],
    exportFields['party'],
    exportFields['conflicts'],
  ],
  'case-interactions': [
    exportFields['case_number'],
    exportFields['hearing_date'],
    exportFields['party'],
    exportFields['interaction_service'],
    exportFields['interaction_service_type'],
    exportFields['interaction_notes'],
  ],
  'case-outcomes': [
    exportFields['case_number'],
    exportFields['hearing_date'],
    exportFields['outcome'],
    exportFields['outcome_notes'],
  ],
};

function convertToCSV(data, report_type){
  return json2csv({data: data, fields: exportType[report_type] });
}

/* GET export all the cases */
// FILTER BY DATE RANGE
// extract out to a utils file

function returnCSV(res, data, filename){
  filename = (typeof filename === 'undefined') ? "testing-"+moment().unix()+".csv" : filename;
  // handle errors - probably wrap in a throw / catch
  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.set('Content-Type', 'text/csv');
  res.status(200).send(data);
}

function caseAggregators(filter){
  // TODO: this is gross
  var arr = [];
  switch (filter){
    case "case-conflicts":
      arr = [
        { $unwind: {"path": "$parties", "preserveNullAndEmptyArrays":true}},
      ];
      break;
    case "case-assigned-services":
      arr = [
        { $unwind: {"path": "$parties", "preserveNullAndEmptyArrays":true}},
        { $unwind: {"path": "$parties.assigned_services", "preserveNullAndEmptyArrays":true}},
      ];
      break;
    case "case-outcomes":
      arr = [
        { $unwind: {"path": "$outcomes", "preserveNullAndEmptyArrays":true}},
      ];
      break;
    case "case-interactions":
      arr = [
        { $unwind: {"path": "$parties", "preserveNullAndEmptyArrays":true}},
        { $unwind: {"path": "$parties.interactions", "preserveNullAndEmptyArrays":true}},
        { $unwind: {"path": "$parties.interactions.types", "preserveNullAndEmptyArrays":true}},
      ];
      break;
    default:
      arr = [
        { $unwind: {"path": "$parties", "preserveNullAndEmptyArrays":true}},
        { $unwind: {"path": "$parties.assigned_services", "preserveNullAndEmptyArrays":true}},
        { $unwind: {"path": "$parties.interactions", "preserveNullAndEmptyArrays":true}},
        { $unwind: {"path": "$parties.interactions.types", "preserveNullAndEmptyArrays":true}},
        { $unwind: {"path": "$outcomes", "preserveNullAndEmptyArrays":true}},
      ];
  }
  // sort all rows by hearing date
  arr.push({ $sort : { 'meta.hearing_date' : -1 }});
  return arr;
}

router.get('/', function(req, res, next) {
  var moment = require('moment');
  var curr_date = moment().format('DD_MMMM_YYYY_h_mm_ss')
  query = req.query.filter;
  var q = Cases.aggregate(caseAggregators(query));

  // return all cases
  q.exec(function(err, cases){
    // 404 if theres an error
    if (err) return res.sendStatus(500);
    // return the cases with the relevant filter applied
    var filename = query + "-" + moment().unix()+".csv";
    returnCSV(res, convertToCSV(cases, query), filename);
  });
});

module.exports = router;
