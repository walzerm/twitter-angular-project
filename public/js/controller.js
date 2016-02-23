app.controller('indexCtrl', function($scope, $http){
	$http.get('partials/pages/home.html').success(function(data){
		$scope.index = data;
	});
});

app.controller('homeCtrl', function($scope, $routeParams){
	$scope.# = $routeParams.#;
});

