(function() {
  angular.module('app.eventsDisplay',[])

  .controller('eventsDisplayController', eventsDisplayController);

  eventsDisplayController.$inject = ["$state", "getEventList", "filteredService"];

  // must display the eventList
  function eventsDisplayController ($state, getEventList, filteredService) {

    $('#nav-header').removeClass("nav-color")

    var vm = this;

    vm.priceFilter = priceFilter;
    vm.titleDescFilter = titleDescFilter;

    vm.setFiltered = filteredService.setFiltered;

    vm.getEventList = getEventList.data;
    getEventList.data[0].city.split('');

    vm.city = getEventList.data[0].city;
    console.log(vm.city);

    vm.displayEvents = displayEvents;

    function priceFilter(event) {
      return event.price >= vm.minPrice && event.price <= vm.maxPrice;
    }

    function titleDescFilter(event) {
      var eventTitle = event.title.toLowerCase();
      var eventDescription = event.description.toLowerCase();
      var inputText = vm.titleOrDescription.toLowerCase();
      return eventTitle.indexOf(inputText) > -1 || eventDescription.indexOf(inputText) > -1;
    }

    function displayEvents() {
      $state.go('eventsDisplay.eventList', {city: vm.findCity});
    }
  }


})();