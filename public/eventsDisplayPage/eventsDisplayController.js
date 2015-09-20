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

    // save filtered data to send to mapsController
    vm.setFiltered = filteredService.setFiltered;

    vm.getEventList = getEventList.data;

    // handle the error when user search the city which doesn't have any events.
    if(getEventList.data[0] === undefined) {
      vm.city = "Oops! we can't find any events in the city.";
      $('.city-description').css("display", "none");
      $('.row').css("display", "none");
      $('.city-header').css("height", "780px");
    } else {
      vm.city = capitalize_Words(getEventList.data[0].city);
    }

    vm.displayEvents = displayEvents;
    
    // capitalize city name
    function capitalize_Words(str){  
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});  
    } 

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