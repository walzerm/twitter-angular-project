var app = angular.module('sentimetaApp', ['angularMoment','ngRoute']);



app.config(function($routeProvider, $locationProvider, $httpProvider){

	$routeProvider
	.when('/', {
		templateUrl : '/partials/index.html',
		controller  : 'mainController'
	})
	.when('/user', {
		templateUrl : '/partials/login.html',
		controller  : 'mainController'
	})
	.when('/new', {
		templateUrl : 'partials/signup.html',
		controller  : 'mainController'		
	})
	.otherwise({redirectTo:('/')})

	$httpProvider.interceptors.push('authInterceptor');

})

