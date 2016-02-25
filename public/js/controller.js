app.controller('mainController',['$scope', '$http', 
						 function($scope,   $http){


	$scope.signup = function() {
			$http({
				method: "POST",
				url: "/new",
				data: $scope.signUp
			}).then(function(data) {
				// Save the JWT to localStorage so we can use it later

				localStorage.setItem('jwt', data.data.jwt);
				// $scope.user.id = data.data.id
			}).catch(function(err){
				console.log(err);
			});
	}

		$scope.login = function() {
			$http({
				method: "POST",
				url: "/login",
				data: $scope.user
			}).then(function(data) {
				// Save the JWT to localStorage so we can use it later
				localStorage.setItem('jwt', data.data.jwt);
			}).catch(function(err){
				console.log(err);
			});
	}

		$scope.logout = function() {
					localStorage.removeItem('jwt');
	}

		$scope.deleteUser = function(){
			$http({
				method:'POST',
				url: '/delete'
			}).then(function(){
				localStorage.removeItem('jwt')
			})
			.catch(function(err){
				console.log(err);
			})
		}
		$scope.twitterAuth = function(){
			$http({
				method:'GET',
				url:'/auth/twitter'
			}).then(function(){
				console.log('yoyoyo')
			}).catch(function(err){
				console.log(err)
			})
		}

}]);

