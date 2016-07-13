require('dotenv').config();
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var express = require('express');
var session = require('express-session');
var flash = require('express-flash');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var mongoose = require('mongoose');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bearerToken = require('express-bearer-token');
var jwt = require('jsonwebtoken'); //create, sign, and verify authentication tokens

// models
var authUser = require('./models/authUser');

var routes = require('./routes/index');
var users = require('./routes/users');
var cases = require('./routes/cases');
var migrations = require('./routes/migrations');
var auth = require('./routes/auth');

var app = express();
// config files
var config = process.env;


// console message colours
var chalk = require('chalk'); // colour our output
var chalkColours = require('./chalk-colours');

// db connection
var db;
var dbName = "njc_triage";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/***
* MIDDLE WARE
***/
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

// add passport for authentication
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// configure passport - add passport middleware and setup
if (_.isUndefined(config.PASSPORT_SECRET) || config.PASSPORT_SECRET === "<your-passport-secret>") throw new Error(error("You must set a your own unique PASSPORT_SECRET in your environment variables"));
app.use(session({secret: config.PASSPORT_SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(authUser.authenticate()));
passport.serializeUser(authUser.serializeUser());
passport.deserializeUser(authUser.deserializeUser());


/***
* ASSETS
***/
// set the static asset path
app.use(compression()); //use compression
app.use(express.static(path.join(__dirname, 'public')));
app.use('/triage/static', express.static('public'));

app.use('/', routes);
//app.use('/users', users);
app.use('/api/authenticate', auth); // token based auth route

/**************************
*   AUTHENTICATED ROUTES  *
***************************/

app.use(bearerToken({
  bodyKey: 'access_token',
  queryKey: 'access_token',
  headerKey: 'Bearer',
  reqKey: 'token'
}));

// Routes that appear after the auth middleware require token auth

// should really be in a seperate function / helpers?
app.use(function(req, res, next){
  // check the header, or url, or post params for the token
  var token = req.token;
  if (token){

    // decode and verify the token
    jwt.verify(token, config.TOKEN_SECRET, function(err, decoded_token){
      if (err){
        // should redirect to login screen if this isnt a json request
        return res.json({
          success: false,
          message: "Failed to authenticate token"
        });
      }
      else {
        // add the token to the req and move on to the next middleware
        req.decoded_token = decoded_token;
        next();
      }
    });
  }
  else {
    // we require a token, so return a 403 if there isnt one
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }
});

// Routes
app.use('/api/cases', cases);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
  // connect to mongodb
  mongoose.connect('mongodb://localhost/' + dbName);
  db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(callback){
    console.log(chalkColours.success("Connected to monogodb"));
  });
}
else {
  // connect to remote mongodb
  mongoose.connect(process.env.MONGO_URL); // connect to local mongo
  db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(callback){
    console.log(chalkColours.success("Connected to monogodb"));
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
