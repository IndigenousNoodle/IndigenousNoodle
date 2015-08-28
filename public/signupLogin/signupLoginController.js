angular.module('app.signupLogin', [])

.controller('signupLoginController', function($scope, $window, $location, Auth) {
	
  $scope.saveUser = function(user) {
    Auth.signup(user)
      .then(function(token) {
        console.log("token: ", token);
        $window.localStorage.setItem('localHosts', token);
        console.log("$window.localStorage: ", $window.localStorage)
        $location.path('/');
      })
      .catch(function(err) {
        console.log("client signup err: ", err);
      })
	};

  $scope.signout = Auth.signout();
})