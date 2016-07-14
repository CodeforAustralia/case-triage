module.exports = function(app){
  require('./feedback-form.controller')(app);
  require('./feedback.service')(app);

  app.config(function($stateProvider){
    $stateProvider
      .state('feedback', {
        abstract: true,
        authenticate : true,
        template: '<ui-view />',
        resolve: {
        }
      })
      .state('feedback.create', {
        url: '/feedback/create',
        authenticate : true,
        template: require('./feedback-create.html'),
    		controller: 'FeedbackCreateController',
        controllerAs: 'vm',
        resolve: {
        }
      });
  });
};
