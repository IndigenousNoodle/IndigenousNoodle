angular.module('app.factories', [])

.factory('Auth', function($http, $location, $window) {

  var signup = function(user) {
    return $http.post('/signup', user)
      .then(function(res) {
        console.log("factory signup post res.data: ", res.data);
        return res.data.token;
      }, function(res) { 
        console.log("factory signup err: ", res)
      }); 
  };

  var signout = function () {
    $window.localStorage.removeItem('localHosts');
    $location.path('/signup');
    console.log("signout user");
  };

   var signin = function (user) {
    return $http.post('/signin', user)
    .then(function(res) {
      console.log("signin res: ", res.data.token);
      return res.data.token;
    }, function(res) {
      console.log("factory signin err: ", res);
    });
  };

  return {
    signup: signup,
    signout: signout,
    signin: signin
  }
})