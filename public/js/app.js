var app = angular.module('sentimeta', ['ngRoute', '$locationProvider'])


app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl : 'pages/home.html',
		controller  : 'homeCtrl'
	})
	.when('/', {
		templateUrl : '',
		controller  : ''		
	})
	.otherwise({redirectTo:('/')})

	$locationProvider.html5Mode(true);
})

