app.controller('mainController',['$scope', '$http', function($scope, $http){
	$scope.landing = 'Hiya';

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
				console.log("BAD THING ^^^");
			});
	}

}]);

app.controller('homeCtrl', function($scope, $routeParams){
	$scope.# = $routeParams.#;
});

