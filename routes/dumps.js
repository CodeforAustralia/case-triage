var express = require('express');
var router = express.Router();

var Feedback = require('../models/feedback');
var Cases = require('../models/cases');
var AuthUsers = require('../models/authUser');

/* POST create some new feedback */
router.get('/users', function(req, res, next){
  var q = AuthUsers.find({});
  // return all cases
  q.exec(function(err, users){
    // 404 if theres an error
    if (err) return res.sendStatus(500);
    // return all the cases otherwise
    res.json(users);
  });
});

router.get('/feedback', function(req, res, next){
  var q = Feedback.find({});
  // return all cases
  q.exec(function(err, feedback){
    // 404 if theres an error
    if (err) return res.sendStatus(500);
    // return all the cases otherwise
    res.json(feedback);
  });
});

router.get('/cases', function(req, res, next){
  var q = Cases.find({});
  // return all cases
  q.exec(function(err, cases){
    // 404 if theres an error
    if (err) return res.sendStatus(500);
    // return all the cases otherwise
    res.json(cases);
  });
});

module.exports = router;
