(function() {
  angular.module('homepage', [])
    .controller('homepageController', homepageController);

  homepageController.$inject = ['$state'];

  function homepageController($state) {
    $('#nav-header').removeClass("nav-color")
    
    var vm = this;
    
    vm.displayEvents = displayEvents;

    vm.newYork = 'new york';
    vm.sanFrancisco = 'san francisco';
    vm.losAngeles = 'los angeles';
    vm.seattle = 'seattle';
    vm.austin = 'austin';

    function displayEvents() {
      $state.go('eventsDisplay.eventList', {city: vm.findCity});
    }

    $('#nav-header').removeClass("nav-color")

    vm.dropDown = "Dropdown";
  }

})();
