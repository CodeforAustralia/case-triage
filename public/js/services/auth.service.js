(function(){
'use strict';

// Authentication service, returns a resource
/*@ngInject*/
angular.module('njcTriage')
	.service('AuthService', function($log, $state, $http, $sanitize, AlertService, Constants){
		var loggedIn = false;

		return {
			isAuthenticated: function(){
				return loggedIn;
			},

			attempt: function(username, password){
				var credentials = {
					username: $sanitize(username),
					password: $sanitize(password)
				};

				$http.post(Constants.urls.api+'/auth/login', credentials).then(function(){
					loggedIn = true;
					$log.log("Go to home");
					$state.go('home');
				}, function(err){
					$log.log(err);

					if (err.status === 401){
						AlertService.error("Incorrect username / password");
					}
				});
			},

			logout: function(){
				return $http.get(Constants.urls.api+'/auth/logout').then(function(){
					loggedIn = false;
				});
			}
		};
	});

})();
