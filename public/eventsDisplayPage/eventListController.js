(function() {
  angular.module('eventList', [])
    .controller('eventListController', eventListController)

    eventListController.$inject = ['$state', 'getEventList'];

    function eventListController($state, getEventList) {
      var vm = this;
      vm.getEventList = getEventList.data;
      vm.toEventDetail = toEventDetail;

      vm.displayEvents = displayEvents;

      ////////////////////////////////////

      function toEventDetail(hostEvent){
        // must pass the event and host data to the next screen
        $state.go('eventDetail', {eventId: hostEvent.id});
      }

      function displayEvents() {
        $state.go('eventsDisplay.eventList', {city: vm.findCity});
      }
    }
    
})();