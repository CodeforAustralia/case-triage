var express = require('express');
var router = express.Router();

var Feedback = require('../models/feedback');

/* POST create some new feedback */
router.post('/', function(req, res, next){
  // the demo should not allow creating / updating of content just reading
  return res.json("Read only mode for the demo :)");

  var model = req.body; // get the passed fields

  var feedback = new Feedback({
    type: model.type,
    message: model.message,
  });

  // save the new feedback item
  feedback.save(function(err, feedback){
    if (err) return res.json(err);
    res.json(feedback);
  });

});

module.exports = router;
