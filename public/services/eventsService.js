(function(){
  angular
      .module('app.dataservice')
      .factory('eventsService', eventsService)

  eventsService.$inject = ['$http'];

  function eventsService ($http) {
    return {
      getEventList: getEventList,
      joinEvent: joinEvent,
      getEvents: getEvents,
      getEvent: getEvent,
      cancelEvent: cancelEvent
    };

    function joinEvent(eventUserData){
      return $http.post('/joinEvent', eventUserData)
        .then(joinEventComplete)
        .catch(joinEventFailed);
    
      function joinEventComplete(data){
        return data;
      }

      function joinEventFailed(error){
        console.log("ERROR: ", error);
      }
    }

    function getEventList(city){
      return $http({method: 'GET', url: '/events/' + city});
    }

    function getEvents($http) {
      
      return $http.get('/events')
        .then(getEventData)
        .catch(eventDataFail);
      
      function getEventData(newData) {
        return newData.data;
      }
      
      function eventDataFail(err) {
        console.log(err);
      }
    }

    function getEvent(id){
      return $http.post('/getEvent', {id: id})
        .then(getEventComplete)
        .catch(getEventFailed);

      function getEventComplete(eventData){
        return eventData;
      }

      function getEventFailed(error){
        console.log("ERR === ", error);
      }
    }

    function cancelEvent (eventJoined) {
      return $http.post('/cancelEvent', eventJoined)
        .then(cancelEventComplete)
        .catch(cancelEventFailed);

      function cancelEventComplete (data) {
        return data;
      }

      function cancelEventFailed(err) {
        console.log("ERROR :", err);
      }
    }

  }

}());