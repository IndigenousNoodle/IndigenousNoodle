(function(){
  angular
      .module('app.dataservice')
      .factory('usersAndEventsService', usersAndEventsService)

  usersAndEventsService.$inject = ['$http'];

  function usersAndEventsService ($http) {

    return {
      postEvent: postEvent
    };

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


}());