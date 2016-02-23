var app = angular.module('sentimetaApp', ['angularMoment','ngRoute']);


app.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		templateUrl : 'partials/index.html',
		controller  : 'mainController'
	})
	.when('/new', {
		templateUrl : 'partials/signup.html',
		controller  : 'mainController'		
	})
	.otherwise({redirectTo:('/')})

})

