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
    .when('/dashboard', {
		templateUrl : 'partials/dashboard.html',
		controller  : 'dashboardController'
	})
	.otherwise({redirectTo:('/')})

	// $locationProvider.html5Mode(true);

	$httpProvider.interceptors.push('authInterceptor');

})
