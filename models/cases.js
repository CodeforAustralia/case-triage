// load the mongoose driver
var mongoose = require('mongoose');

// TODO: Validations for the model
// TODO: Need to extend the 'parties' model to include age / dob, name, attended status

var CaseSchema = mongoose.Schema({
  meta:{
    case_number: String,
    list_number: Number,
    hearing_date: Date,
    hearing_type: String,
    matter: String,
  },
  parties: [{
    name: String,
    attended: Boolean,
    age: Number,
    birthday: Date,
    assigned_services: [],
    interactions: [{
      created_at: {type: Date, default: new Date()},
      service_provider: String,
      types: [],
      notes: String,
    }],
    conflicts: {
      vla: {type: Boolean, default: false},
      fls: {type: Boolean, default: false}
    },
  }],
  outcomes: [{
    created_at: {type: Date, default: new Date()},
    outcome: String,
    adjournment_date: Date,
    notes: String,
  }],
});

var Cases = mongoose.model('Cases', CaseSchema);
module.exports = Cases;
