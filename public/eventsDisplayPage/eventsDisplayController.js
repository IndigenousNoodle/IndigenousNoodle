(function() {
  angular.module('app.eventsDisplay',[])

  .controller('eventsDisplayController', eventsDisplayController);

  eventsDisplayController.$inject = ["$state"];

  // must display the eventList
  function eventsDisplayController ($state) {
    console.log("eventsDisplayController");
  }
})();
