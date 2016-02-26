app.controller('mainController',['$scope', '$http', '$rootScope', '$location',
						 function($scope,   $http, $rootScope, $location){



	$scope.signup = function() {
		$scope.passwordMatch = $scope.signUp.password === $scope.signUp.passwordConfirm;
			debugger;
			if ($scope.passwordMatch){
				$http({
					method: "POST",
					url: "/new",
					data: $scope.signUp
				}).then(function(data) {
					// Save the JWT to localStorage so we can use it later

					localStorage.setItem('jwt', data.data.jwt);
					// $scope.user.id = data.data.id
				}).catch(function(err){

				});
			}
	};

		$scope.login = function() {
			$http({
				method: "POST",
				url: "/tweets",
				data: $scope.user
			}).then(function(data) {
				// Save the JWT to localStorage so we can use it later
				localStorage.setItem('jwt', data.data.jwt);
                $rootScope.currentUser = data.data.twitterHandle;
                console.log('hi');
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

                                $scope.allTweets = data;

                                $scope.handle = data.data.data[0].twitter_handle;

                                $scope.score = data.data.data.map( function(tweet){
                                    return tweet.tweet_score;
                                });

                                chartRender($scope.score);

                            })

}]);

function chartRender(tweetParse) {
    var ctx = $('#myChart').get(0).getContext('2d');


var posi=0;
var neut=0;
var neg=0;

for(var i = 0; i < tweetParse.length; i++) {
    var score = tweetParse[i];

    if (score == "0"){
        neg++;
    }
    if (score == "4"){
        posi++;
    }

    if(score == "2"){
        neut++;
    }


}

var renderChart = [
    {
        value: posi,
        color:"#00bbff",
        highlight: "#4fd0ff",
        label: "positive"
    },
    // {
    //     value: neut,
    //     color: "#e2e2e2",
    //     highlight: "#eee",
    //     label: "neutral"
    // },
    {
        value: neg,
        color: "#ee2560",
        highlight: "#ff497e",
        label: "negative"
    }

];


    var chart = new Chart(ctx).Doughnut(renderChart);
}
