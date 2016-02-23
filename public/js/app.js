var app = angular.module('sentimeta', [
	'angularMoment',
	'ngRoute', 
	'$locationProvider'
	]);


app.config(function($routeProvider, $locationProvider){

	$routeProvider
	.when('/index', {
		templateUrl : 'partials/pages/index.html',
		controller  : 'indexCtrl'
	})
	.when('/new', {
		templateUrl : 'partials/signup.html',
		controller  : 'mainController'		
	})
	.otherwise({
		redirectTo:'/index'
	});


	$locationProvider.html5Mode(true);
});



