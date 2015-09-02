(function(){
  angular
      .module('app.dataservice')
      .factory('Auth', Auth)

  Auth.$inject = ['$http', '$state', '$window'];

  function Auth($http, $state, $window) {

    return {
      signup: signup,
      signout: signout,
      signin: signin,
      isAuth: isAuth
      // logCookie: logCookie
    };

    //////////////////////////////////////////////////////

    function signup(user) {
      return $http.post('/signup', user)
        .then(signupGetToken)
        .catch(signupUserFaild);

      function signupGetToken(res) {
        // console.log("factory signup post res.data: ", res.data);
        return res.data.token;
      }

      function signupUserFaild(res) { 
        console.log("factory signup err: ", res)
      }
    };

    function signout() {
      $window.localStorage.removeItem('localHosts');
      $state.go('signin');
    };

    function signin(user) {
      return $http.post('/signin', user)
      .then(signinGetToken)
      .catch(signinUserFaild);

      function signinGetToken(res) {
        // console.log("signin res: ", res.data.token);
        return res.data.token;
      }
      function signinUserFaild(res) {
        console.log("factory signin err: ", res);
      }
    };

    function isAuth() {
      return !!$window.localStorage.getItem('localHosts');
    }
  }

}());