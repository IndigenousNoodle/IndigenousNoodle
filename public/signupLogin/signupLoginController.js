(function() {
  angular.module('app.signupLogin', [])
    .controller('signupLoginController', signupLoginController)

  signupLoginController.$inject = ['$rootScope', '$window', '$state', 'Auth'];

  function signupLoginController($rootScope, $window, $state, Auth) {
    
      var vm = this;
      vm.signup = signup;
      vm.signin = signin;
      vm.signout = Auth.signout;
      vm.requireLogin = requireLogin;
      // vm.logCookies = logCookies;

    function signup(user) {
      Auth.signup(user)
        .then(setSignupToken)
        .catch(function(err) {
          console.log("signup err: ", err);
        })

      function setSignupToken(token) {
        if(token) {
          // console.log("signup taken: ", token);
          $window.localStorage.setItem('localHosts', token);
          // console.log("signup $window.localStorage: ", $window.localStorage);
          $state.go('homepage');
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
          // console.log("signin token: ", token);
          $window.localStorage.setItem('localHosts', token);
          // console.log("signin $window.localStorage: ", $window.localStorage);
          $state.go('homepage');
        }
      }
    }

    // function requireLogin() {
    //   $state.go('requireSignin');
    // }

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



