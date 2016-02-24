app.controller('mainController',['$scope', '$http', 
						 function($scope,   $http){
	
	$scope.landing = 'Hiya';
	$scope.logger = 'Fellas';


	$scope.signup = function() {
			$http({
				method: "POST",
				url: "/new/user",
				data: $scope.user
			}).then(function(data) {
				// Save the JWT to localStorage so we can use it later
				localStorage.setItem('jwt', data.data.jwt);
				$scope.user.id = data.data.id
			}).catch(function(err){
				console.log(err);

				$scope.userInvalid
				.directive('userInvalid', function(){
					return{
						template: {{userInvalid}} 
					};
				});
			});
	}

		$scope.login = function() {
			$http({
				method: "POST",
				url: "user/login",
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

}]);

app.controller('homeCtrl', ['$scope', '$routeParams'function($scope, $routeParams){
	$scope.dashboard = 'welcome';

	$scope.loggedin = function(){
		
	}
}]);

