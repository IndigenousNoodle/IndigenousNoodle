(function(){
  angular
      .module('app.dataservice')
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

  AttachToken.$inject = ['$window'];

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

}());