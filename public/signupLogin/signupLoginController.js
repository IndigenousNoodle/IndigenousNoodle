angular.module('app.signupLogin', [])

.controller('signupLoginController', function($scope, $window, $location, Auth) {
	
  $scope.singup = function(user) {
    Auth.signup(user)
      .then(function(token) {
        console.log("signup taken: ", token);
        $window.localStorage.setItem('localHosts', token);
        console.log("signup $window.localStorage: ", $window.localStorage);
        $location.path('/');
      })
      .catch(function(err) {
        console.log("signup err: ", err);
      })
	};

  $scope.signin = function(user) {
    Auth.signin(user)
      .then(function(token) {
        console.log("signin token: ", token);
        $window.localStorage.setItem('localHosts', token);
        console.log("signin $window.localStorage: ", $window.localStorage);
        $location.path('/');
      })
      .catch(function(err) {
        console.log("signin err: ", err);
      })
  }

  $scope.signout = Auth.signout;
})