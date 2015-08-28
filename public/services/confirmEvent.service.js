(function(){
  angular
      .module('app')
      .factory('confirmEvent', confirmEvent);

  confirmEvent.$inject = ['$http'];

  function confirmEvent($http){
    return {
      confirmEvent: confirmEvent
    };
    
    function confirmEvent(username){
      return $http.post('/user/confirmEvent/' + username)
        .then(confirmEventComplete)
        .catch(confirmEventFailed);

      function confirmEventComplete(data){
        console.log("confirming event complete");
        return data;
      }

      function confirmEventFailed(error){
        console.log("ERROR: ", error);
      }
    }
  }
})();