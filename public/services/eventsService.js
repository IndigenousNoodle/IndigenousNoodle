(function(){
  angular
      .module('app.dataservice')
      .factory('eventsService', eventsService)

  eventsService.$inject = ['$http'];

  function eventsService ($http) {
    return {
      getEventList: getEventList,
      joinEvent: joinEvent
    }

    function getEventList(city){
      return $http({method: 'GET', url: '/events/' + city});
    }

    function joinEvent(eventData, userData){
      return $http.post('/joinEvent', {eventData: eventData, userData: userData})
        .then(joinEventComplete)
        .catch(joinEventFailed);
    
      function joinEventComplete(data){
        console.log("joining event complete");
        return data;
      }

      function joinEventFailed(error){
        console.log("ERROR: ", error);
      }
    }
  }

}());