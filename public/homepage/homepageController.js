(function() {
  angular.module('homepage', [])
    .controller('homepageController', homepageController);

  homepageController.$inject = ['$state'];

  function homepageController($state) {
    $('#nav-header').removeClass("nav-color")
    
    var vm = this;
    
    vm.displayEvents = displayEvents;


    function displayEvents() {
      $state.go('eventsDisplay.eventList', {city: vm.findCity});
    }

    $('#nav-header').removeClass("nav-color")

    vm.dropDown = "Dropdown";
  }

})();
