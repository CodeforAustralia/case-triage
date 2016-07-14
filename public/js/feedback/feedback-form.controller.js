module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.controller('FeedbackCreateController', function($scope, $log, $rootScope, $state, $modal, FeedbackService, toastr){
    $log.log("Starting the FeedbackCreateController");
    var vm = this;

    vm.types = [{'value':'bug', 'name':'Bug / Somethings broken'}, {'value':'enhancement', 'name':'Enhancement / New idea'}, {'value':'feedback', 'name':'Feedback'}, {'value':'not-sure', 'name':'Not sure, but i want to tell you!'}];

    /*var modal = $modal({
      title: 'Send your feedback',
      contentTemplate: '/js/feedback/feedback.html',
      show: true,
      scope: $scope,
    });

    $log.log(modal);

    $scope.$on('modal.hide',function(){
      $log.log("HIDING");
      $state.go('app.dashboard');
    });*/

    //vm.model = new Entry(); // create a new instance of the entry model
    vm.model = {};
    vm.submitted = false;

    // array of our form fields needed
    vm.fields = [
      {
        key: 'type',
        type: 'select',
        templateOptions: {
          label: 'Type of issue',
          required: true,
          options: vm.types,
        }
      },
      {
        key: 'message',
        type: 'textarea',
        templateOptions: {
          label: 'Message',
          required: true,
        }
      }
    ];

    vm.submit = function(){
      $log.log("Submitting the evaluation");
      FeedbackService
        .create(vm.model)
        .then(function(){
          toastr.success("Submitted your evaluation!");
          vm.submitted = true;
        }, function(){
          toastr.error("There was a problem submitting your feedback, please refresh and try again.");
        });
    };

    function init(){
      $log.log("Loaded the evaluation form controller");
    }

    init();
  });

};
