(function(){
  angular
      .module('app.dataservice')
      .factory('usersService', usersService)

  usersService.$inject = ['$http'];

  function usersService ($http) {

    return {
      getUserEvents: getUserEvents,
      getUserProfile: getUserProfile,
      confirmEvent: confirmEvent
    };


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
      return $http.post('/user/userProfile/', {username: username})
        .then(getUserProfileComplete)
        .catch(getUserPorfileFailed)

        function getUserProfileComplete (newData) {
          return newData;
        }

        function getUserPorfileFailed (error) {
          console.log("ERROR: ", error);
        }
    }

    function confirmEvent(acceptedUser, eventId){
      return $http.post('/user/confirmEvent/', {acceptedUser: acceptedUser, eventId: eventId})
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

}());