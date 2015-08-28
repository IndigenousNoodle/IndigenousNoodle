(function(){

  angular
      .module('app')
      .factory('dataservice', dataservice)
      .factory('getEvents', getEvents)

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

  function getEvents($http) {
    return {
      getEvent: getEvent
    };
    function getEvent() {
      return $http.get('/events')
      .then(getEventData)
      .catch(eventDataFail);
    }
    function getEventData(newData) {
      return newData.data;
    }
    function eventDataFail(err) {
      console.log(err)
    }
  }
})();
