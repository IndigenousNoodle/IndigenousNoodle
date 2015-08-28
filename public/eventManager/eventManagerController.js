(function() {
  angular.module('app.eventManager',[])

  .controller('eventManagerController', eventManagerController);

  eventManagerController.$inject = ['getEventsPrep'];

  function eventManagerController (getEventsPrep) {
    var vm = this;
    vm.hosted = getEventsPrep.data.hostedEvents;
    vm.joined = getEventsPrep.data.joinedEvents;
  }
})();