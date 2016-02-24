app.service('authInterceptor', function($window,$location,$q){
	return {
		request: function(config){
			var token = localStorage.getItem('jwt');

			if(token) config.headers.Authorization = 'Bearer ' + token
				console.log(config)
			return config;
		}
	}
})