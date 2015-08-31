(function() {
  angular.module('eventList', [])
    .controller('eventListController', eventListController)

    function eventListController(getEventList, $state) {
      var vm = this;
      vm.getEventList = getEventList.data;

      vm.displayEvents = displayEvents;

      function displayEvents() {
        $state.go('eventList', {city: vm.findCity});
      }
    }
})();