(function() {
  angular.module('homepage', [])
    .controller('homepageController', homepageController)

  function homepageController($state) { 
    var vm = this;
    
    vm.displayEvents = displayEvents;

    function displayEvents() {
      $state.go('eventList', {city: vm.findCity});
    }
  }

})();
