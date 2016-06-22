module.exports = function(app){
'use strict';

// Authentication service, returns a resource
/*@ngInject*/
app.service('AuthService', function($log, $http, $sanitize, TokenService){
		return {
			isAuthenticated: function(){
				return TokenService.isAuthenticated();
			},

			attempt: function(username, password){
				var credentials = {
					username: $sanitize(username),
					password: $sanitize(password)
				};

				return $http.post('/api/authenticate/token', credentials);
			},

			logout: function(){
				// resolve the token
				return $q.resolve(TokenService.clear());
			}
		};
	});

};
