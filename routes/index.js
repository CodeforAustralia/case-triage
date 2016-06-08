var express = require('express');
var app = express();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var env = app.get('env');
  res.render('index', { title: 'NJC Triage', env: env });
});

module.exports = router;
