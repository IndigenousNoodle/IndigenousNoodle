(function() {
  angular
    .module('app.factories', [])
    .factory('Auth', Auth)

  Auth.$inject = ['$http', '$location', '$window'];


  function Auth($http, $location, $window) {

    return {
      signup: signup,
      signout: signout,
      signin: signin
    };

    //////////////////////////////////////////////////////

    function signup(user) {
      return $http.post('/signup', user)
        .then(function(res) {
          console.log("factory signup post res.data: ", res.data);
          return res.data.token;
        }, function(res) { 
          console.log("factory signup err: ", res)
        }); 
    };

    function signout() {
      $window.localStorage.removeItem('localHosts');
      $location.path('/signup');
      console.log("signout user");
    };

     function signin(user) {
      return $http.post('/signin', user)
      .then(function(res) {
        console.log("signin res: ", res.data.token);
        return res.data.token;
      }, function(res) {
        console.log("factory signin err: ", res);
      });
    };
  }
})();