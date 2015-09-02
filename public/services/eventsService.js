(function(){
  angular
      .module('app.dataservice')
      .factory('eventsService', eventsService)

  eventsService.$inject = ['$http'];

  function eventsService ($http) {
    return {
      getEventList: getEventList,
      joinEvent: joinEvent,
      getEvent: getEvent
    };

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
      console.log("getting event", id);
      return $http.post('/getEvent', {id: id})
        .then(getEventComplete)
        .catch(getEventFailed);

      function getEventComplete(eventData){
        console.log("getting event complete");
        return eventData;
      }

      function getEventFailed(error){
        console.log("ERR === ", error);
      }
    }

  }

}());