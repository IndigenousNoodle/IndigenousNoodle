(function(){

  angular
      .module('app.dataservice', [])
      .factory('dataservice', dataservice)
      .factory('getEvents', getEvents)

  dataservice.$inject = ['$http'];


  function dataservice($http){

    return {
      postEvent: postEvent,
      getUserEvents: getUserEvents,
      getUserProfile: getUserProfile
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

    function getUserEvents() {
      return $http.get('/user/eventsManager')
        .then(getUserEventsComplete)
        .catch(getUserEventsFailed)

        function getUserEventsComplete (newData) {
          return newData
        }
        function getUserEventsFailed(error) {
          console.log("ERROR: ", error);
        }
    }

    function getUserProfile(username) {
      return $http.get('/user/userProfile/'  + username)
        .then(getUserProfileComplete)
        .catch(getUserPorfileFailed)

        function getUserProfileComplete (newData) {
          return newData;
        }

        function getUserPorfileFailed (error) {
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
