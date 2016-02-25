var app = angular.module('sentimeta', [
	'angularMoment',
	'ngRoute'
	]);


app.config(function($routeProvider, $locationProvider, $httpProvider){

	$routeProvider

	.when('/', {
		templateUrl : 'partials/index.html',
		controller  : 'mainController'
	})
	.when('/new', {
		templateUrl : 'partials/signup.html',
		controller  : 'mainController'		
	})
	.when('/user', {
	templateUrl : 'partials/login.html',
	controller  : 'mainController'		
	})
	.otherwise({
		redirectTo:'/'
	});


	$locationProvider.html5Mode(true);

	$httpProvider.interceptors.push('authInterceptor');

});

