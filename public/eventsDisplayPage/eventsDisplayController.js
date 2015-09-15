(function() {
  angular.module('app.eventsDisplay',[])

  .controller('eventsDisplayController', eventsDisplayController);

  eventsDisplayController.$inject = ["$state", "getEventList", "filteredService"];

  // must display the eventList
  function eventsDisplayController ($state, getEventList, filteredService) {

    var vm = this;

    vm.priceFilter = priceFilter;
    vm.titleDescFilter = titleDescFilter;

    vm.setFiltered = filteredService.setFiltered;

    vm.getEventList = getEventList.data;
    
    function priceFilter(event) {
      return event.price >= vm.minPrice && event.price <= vm.maxPrice;
    }

    function titleDescFilter(event) {
      var eventTitle = event.title.toLowerCase();
      var eventDescription = event.description.toLowerCase();
      var inputText = vm.titleOrDescription.toLowerCase();
      return eventTitle.indexOf(inputText) > -1 || eventDescription.indexOf(inputText) > -1;
    }
  }


})();