(function() {
  angular
    .module('app.factories', [])
    .factory('Auth', Auth)
    .factory('AttachToken', AttachToken)

    
  .factory('AttachTokens', function ($window) {
    console.log('MAKING AN AJAX REQUEST')
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('localHosts');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})


  Auth.$inject = ['$http', '$location', '$window'];
  AttachToken.$inject = ['$window'];



  function Auth($http, $location, $window) {

    return {
      signup: signup,
      signout: signout,
      signin: signin,
      isAuth: isAuth,
      // logCookie: logCookie
    };

    //////////////////////////////////////////////////////

    function signup(user) {
      return $http.post('/signup', user)
        .then(signupGetToken)
        .catch(signupUserFaild);

      function signupGetToken(res) {
        console.log("factory signup post res.data: ", res.data);
        return res.data.token;
      }

      function signupUserFaild(res) { 
        console.log("factory signup err: ", res)
      }
    };

    function signout() {
      $window.localStorage.removeItem('localHosts');
      $location.path('/signup');
      console.log("signout user");
    };

    function signin(user) {
      return $http.post('/signin', user)
      .then(signinGetToken)
      .catch(signinUserFaild);

      function signinGetToken(res) {
        console.log("signin res: ", res.data.token);
        return res.data.token;
      }
      function signinUserFaild(res) {
        console.log("factory signin err: ", res);
      }
    };

    function isAuth() {
      return !!$window.localStorage.getItem('localHosts');
    }

    // funtion for testing if token is attached to req and decoded in res 
    /*function logCookie() {
      return $http.post('/logCookie')
      .then(function(res) {
        console.log("logCookie res: ", res.data);
        return res.data;
      })
    }*/
  }

  /**********************************************************/

  function AttachToken($window) {
      // console.log("inside attachToken");
      var attach = {
        request: attachTokenToRequest
      };
      // console.log("inside attachToken, attach: ", attach);
      return attach;

      function attachTokenToRequest(object) {
        var jwt = $window.localStorage.getItem('localHosts');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    }

})();







