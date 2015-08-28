(function(){

  angular
      .module('app')
      .factory('dataservice', dataservice);

  dataservice.$inject = ['$http'];

  function dataservice($http){

    return {
      postEvent: postEvent
    };

    /////////////////////////////
    
    function postEvent(eventData){
      return $http.post('/postEvents', eventData)
        .then(postEventsComplete)
        .catch(postEventsFailed);

      function postEventsComplete(data){
        console.log("posting event complete");
        return data;
      }

      function postEventsFailed(error){
        console.log("ERROR: ", error);
      }
    }
  }
})();
