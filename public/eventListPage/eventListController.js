(function() {
  angular.module('eventList', [])
    .controller('eventListController', eventListController)

    eventListController.$inject = ['$state', 'getEventList', 'sendEvent'];

    function eventListController($state, getEventList, sendEvent) {
      var vm = this;
      vm.getEventList = getEventList.data;

      vm.toEventDetail = toEventDetail;

      vm.displayEvents = displayEvents;

      ////////////////////////////////////

      function toEventDetail(hostEvent){
        // must pass the event and host data to the next screen
        console.log("event === ", hostEvent);
        sendEvent.setCurrentEvent(hostEvent);
        $state.go('eventDetail');
      }

      function displayEvents() {
        $state.go('eventList', {city: vm.findCity});
      }

    }
    
})();