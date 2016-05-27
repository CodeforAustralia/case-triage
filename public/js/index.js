var angular = require('angular');

// require our 3rd party modules
require('angular-cache');
require('angular-formly');
require('angular-formly-templates-bootstrap');
require('angular-moment');
require('angular-resource');
require('angular-sanitize');
require('angular-strap');
require('npm/angular-strap/dist/angular-strap.tpl');
require('angular-toastr');
require('angular-ui-router');
require('lodash');
require('moment');

// create the app module
var app = angular.module('njcTriage', [
    'ui.router',
    'angular-cache',
    'ngResource',
    'ngSanitize',
    'formly',
    'formlyBootstrap',
    'mgcrea.ngStrap',
    'toastr'
  ]);

// main app
require('./app')(app);

// controllers
require('./controllers/cases.details')(app);
require('./controllers/cases.index')(app);
require('./controllers/cases.update')(app);
require('./controllers/cases.new')(app);
require('./controllers/login.controller')(app);
require('./controllers/outcomes.update')(app);

// directives
require('./directives/cases-panels.directive')(app);
require('./directives/cases-table.directive')(app);
require('./directives/case-details.directive')(app);
require('./directives/interactions.directive')(app);

// services
require('./services/alert.service')(app);
require('./services/auth.service')(app);
require('./services/cases.service')(app);
require('./services/hearing-types.service')(app);
require('./services/matters.service')(app);
require('./services/interactions.service')(app);
require('./services/providers.service')(app);