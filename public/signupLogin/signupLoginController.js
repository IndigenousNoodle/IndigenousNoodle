(function() {
  angular.module('app.signupLogin', [])
    .controller('signupLoginController', signupLoginController)

  signupLoginController.$inject = ['$rootScope', '$window', '$state', 'Auth'];

  function signupLoginController($rootScope, $window, $state, Auth) {
      $('#nav-header').addClass("nav-color")

      var vm = this;
      vm.signup = signup;
      vm.signin = signin;
      vm.signout = Auth.signout;
      // vm.requireLogin = requireLogin;
      // vm.logCookies = logCookies;

    // Auth.signup from signupLoginService.js
    function signup(user) {
      Auth.signup(user)
        .then(setSignupToken)
        .catch(function(err) {
          console.log("signup err: ", err);
        })

      function setSignupToken(token) {
        if(token) {
          $window.localStorage.setItem('localHosts', token);
          $state.go('homepage');
        }
      }
    }

    // Auth.signin from signupLoginService.js
    function signin(user) {
      Auth.signin(user)
        .then(setSigninToken)
        .catch(function(err) {
          console.log("signin err: ", err);
        })

      function setSigninToken(token) {
        if (token) {
          // attach user info to localstorage for later usage
          $window.localStorage.setItem('localHosts', token);
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



