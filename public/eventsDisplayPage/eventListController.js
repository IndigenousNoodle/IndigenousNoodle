(function() {
  angular.module('eventList', [])
    .controller('eventListController', eventListController)

    eventListController.$inject = ['$state', 'getEventList'];

    function eventListController($state, getEventList) {
      var vm = this;
      vm.getEventList = getEventList.data;
      vm.toEventDetail = toEventDetail;

      vm.displayEvents = displayEvents;

      vm.filter = filter;

      ////////////////////////////////////

      function toEventDetail(hostEvent){
        // must pass the event and host data to the next screen
        $state.go('eventDetail', {eventId: hostEvent.id});
      }

      function displayEvents() {
        $state.go('eventsDisplay.eventList', {city: vm.findCity});
      }

      function filter(event) {
        var title = event.title.toLowerCase();
        var description = event.description.toLowerCase();
        var titleOrDescription = vm.titleOrDescription.toLowerCase();
        return event.price >= vm.minPrice && event.price <= vm.maxPrice && (title.indexOf(titleOrDescription) > -1 || description.indexOf(titleOrDescription) > -1);
      }
    }
    
})();