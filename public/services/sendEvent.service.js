(function(){
  angular
    .module('app.factories', [])
    .factory('sendEvent', sendEvent);

  sendEvent.$inject = [];

  function sendEvent(){

    var currentEvent;

    return {
      setCurrentEvent: setCurrentEvent,
      getCurrentEvent: getCurrentEvent
    };
    
    /////////////////////////////////

    function setCurrentEvent(newEvent){
      console.log("Setting current event", newEvent);
      currentEvent = newEvent;
    }

    function getCurrentEvent(){
      console.log("getting current event", currentEvent);
      return currentEvent;
    }
  }

})();

// {"_id":"55e1ffaa5b0224da7c6d01a7","host":"Michael",
// "title":"Hiking","city":"san francisco","time":"2015-12-21T05:30:00.000Z",
// "description":"Come with me if you want to live","__v":0,"reviews":[]}
