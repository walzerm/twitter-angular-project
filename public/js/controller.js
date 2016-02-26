app.controller('mainController',['$scope', '$http', 'ngMessages', 
						 function($scope,   $http, $ngMessages){


	$scope.signup = function() {
		$scope.passwordMatch = $scope.signUp.password === $scope.signUp.passwordConfirm;
			debugger;
			if ($scope.passwordMatch){
				$http({
					method: "POST",
					url: "/new",
					data: $scope.signUp
				}).then(function(data) {
					// Save the JWT to localStorage so we can use it later

					localStorage.setItem('jwt', data.data.jwt);
					// $scope.user.id = data.data.id
				}).catch(function(err){

				});
			} 
	};

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
				res.send('still here huehuehue')
				localStorage.removeItem('jwt');
			})
			.catch(function(err){
				console.log('xxxxxxxxxxxxxx')
				console.log(err);
			})
		}

}]);

	// $scope.passwordError = $scope.signUp.password === $scope.signUp;

app.controller('homeCtrl', ['$scope', '$routeParams', function($scope, $routeParams){
	$scope.dashboard = 'welcome';

	$scope.loggedin = function(){
		
	}
}]);

