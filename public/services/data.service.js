(function(){

  angular
      .module('app.dataservice', [])
      .factory('dataservice', dataservice)

  dataservice.$inject = ['$http'];


  function dataservice($http){

    return {
      postEvent: postEvent,
      getEventList: getEventList,
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

    function getUserProfile(token) {
      return $http.get('/user/userProfile/')
        .then(getUserProfileComplete)
        .catch(getUserPorfileFailed)

        function getUserProfileComplete (newData) {
          return newData;
        }

        function getUserPorfileFailed (error) {
          console.log("ERROR: ", error);

        }
    }

    function getEventList(city){
      return $http({method: 'GET', url: '/events/' + city});
    }

  }

})();
