angular.module("app")
.controller('signupController', function($scope, $http) {
	$scope.saveUser = function(user) {

		$http.post('/signup', $scope.user).
      then(function(response) {
        console.log(response);
      });

	}
})