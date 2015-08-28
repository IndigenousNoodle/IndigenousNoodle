angular.module('app.factories', [])

.factory('Auth', function($http, $location, $window) {

  var signup = function(user) {
    return $http.post('/signup', user)
      .then(function(res) {
        console.log("factory signup post res.data: ", res.data);
        return res.data.token;
      }, function(res) { 
        console.log("signup res err: ", res)
      }); 
  };

  var signout = function () {
    $window.localStorage.removeItem('localHosts');
    $location.path('/signup');
    console.log("signout user");
  };

  return {
    signup: signup,
    signout: signout
  }
})