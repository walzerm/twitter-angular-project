var app = angular.module('sentimeta', [
	'angularMoment',
	'ngRoute', 
	'$locationProvider'
	]);


app.config(function($routeProvider, $locationProvider, $httpProvider){

	$routeProvider

	.when('/home', {
		templateUrl : 'public/partials/pages/index.html',
		controller  : 'homeCtrl'
	})
	.when('/new', {
		templateUrl : 'public/partials/signup.html',
		controller  : 'mainController'		
	})
	.when('/user', {
	templateUrl : 'public/partials/login.html',
	controller  : 'mainController'		
	})
	.otherwise({
		redirectTo:'/home'
	});


	$locationProvider.html5Mode(true);
});

	$httpProvider.interceptors.push('authInterceptor');

})


