// load the mongoose driver
var mongoose = require('mongoose');

// TODO: Validations for the model
// TODO: Need to extend the 'parties' model to include age / dob, name, attended status

var CaseSchema = mongoose.Schema({
  meta:{
    case_number: String,
    hearing_date: Date,
    hearing_type: String,
    matter: String
  },
  parties: [{name: String, age: Number, birthday: Date}],
  conflicts: {
    vla: {type: Boolean, default: false},
    fls: {type: Boolean, default: false}
  },
  interactions: [{
    created_at: {type: Date, default: new Date()},
    service_provider: String,
    types: [],
    notes: String,
  }],
  assigned_services: [],
  outcomes: [{
    created_at: {type: Date, default: new Date()},
    outcome: String,
    adjournment_date: Date,
    notes: String,
  }]
});

var Cases = mongoose.model('Cases', CaseSchema);
module.exports = Cases;
