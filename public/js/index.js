var angular = require('angular');

// require our 3rd party modules
require('angular-base64');
require('angular-cache');
require('angular-formly');
require('angular-formly-templates-bootstrap');
require('angular-local-storage');
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
    'toastr',
    'LocalStorageModule',
    'base64',
  ]);

// main app
require('./app')(app);

// controllers
require('./controllers/cases.dashboard')(app);
require('./controllers/cases.details')(app);
require('./controllers/cases.index')(app);
require('./controllers/cases.update')(app);
require('./controllers/cases.new')(app);
require('./controllers/login.controller')(app);
require('./controllers/outcomes.update')(app);

// directives
require('./directives/cases-filters.directive')(app);
require('./directives/cases-list.directive')(app);
require('./directives/cases-panels.directive')(app);
require('./directives/cases-table.directive')(app);
require('./directives/case-party.directive')(app);
require('./directives/case-details.directive')(app);
require('./directives/interactions.directive')(app);

// filters
require('./filters/case-hearing-date.filter.js')(app);

// services
require('./services/alert.service')(app);
require('./services/auth.service')(app);
require('./services/cases.service')(app);
require('./services/client.service')(app);
require('./services/hearing-types.service')(app);
require('./services/http-interceptor.service')(app);
require('./services/matters.service')(app);
require('./services/interactions.service')(app);
require('./services/providers.service')(app);
require('./services/session.service')(app);
require('./services/token.service')(app);
