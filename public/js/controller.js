app.controller('mainController',['$scope', '$http', '$rootScope', '$location',
						 function($scope,   $http, $rootScope, $location){


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
				url: "/tweets",
				data: $scope.user
			}).then(function(data) {
				// Save the JWT to localStorage so we can use it later
				localStorage.setItem('jwt', data.data.jwt);
				  $('#modal1').closeModal();

                $rootScope.currentUser = data.data.twitterHandle;
                console.log('hi');
                debugger;
                $location.path('/dashboard');

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


}]);

app.controller('dashboardController',['$scope', '$http', '$rootScope',
						function($scope,   $http, $rootScope){
                            console.log("hello");
                            $http({
                				method: "GET",
                				url: "/tweets/" + $rootScope.currentUser
                			}).then(function(data) {

                                $scope.tweets = data;
                            })

}]);
