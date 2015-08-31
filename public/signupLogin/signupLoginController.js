(function() {
  angular.module('app.signupLogin', [])
    .controller('signupLoginController', signupLoginController)

  signupLoginController.$inject = ['$window', '$location', 'Auth'];

  function signupLoginController($window, $location, Auth) {
    
      var vm = this;
      vm.signup = signup;
      vm.signin = signin;
      vm.signout = Auth.signout;
      // vm.logCookies = logCookies;

    function signup(user) {
      Auth.signup(user)
        .then(setSignupToken)
        .catch(function(err) {
          console.log("signup err: ", err);
        })

      function setSignupToken(token) {
        if(token) {
          console.log("signup taken: ", token);
          $window.localStorage.setItem('localHosts', token);
          console.log("signup $window.localStorage: ", $window.localStorage);
          $location.path('/');
        }
      }
    }

    function signin(user) {
      Auth.signin(user)
        .then(setSigninToken)
        .catch(function(err) {
          console.log("signin err: ", err);
        })

      function setSigninToken(token) {
        if (token) {
          console.log("signin token: ", token);
          $window.localStorage.setItem('localHosts', token);
          console.log("signin $window.localStorage: ", $window.localStorage);
          $location.path('/');
        }
      }
    }

    // funtion for testing if token is attached to req and decoded in res
    /*function logCookies() {
      Auth.logCookie()
        .then(function(data) {
          console.log("logCookie: ", data);
        })
        .catch(function(err) {console.log(err);})
    }*/

  }
})();



