// load the mongoose driver
var mongoose = require('mongoose');

var FeedbackSchema = mongoose.Schema({
  type: String,
  message: String,
  created_at: {type: Date, default: new Date()},
});

var Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;
