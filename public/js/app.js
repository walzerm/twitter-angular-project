var app = angular.module('sentimeta', [
	'ngRoute', 
	'$locationProvider'
	]);


app.config(function($routeProvider){
	$routeProvider
	.when('/index', {
		templateUrl : 'partials/pages/home.html',
		controller  : 'indexCtrl'
	})
	.when('/', {
		templateUrl : '',
		controller  : ''		
	})
	.otherwise({
		redirectTo:'/index'
	});

	$locationProvider.html5Mode(true);
});

