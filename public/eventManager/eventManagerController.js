(function() {
  angular.module('app.eventManager',[])

  .controller('eventManagerController', eventManagerController);

  eventManagerController.$inject = ['getEventsPrep'];

  function eventManagerController (getEventsPrep, confirmEvent) {
    var vm = this;
    vm.confirmUser = confirmUser;
    vm.hosted = getEventsPrep.data.hostedEvents;
    vm.joined = getEventsPrep.data.joinedEvents;


    function confirmUser (username) {
      confirmEvent.confirmEvent(username);
    }
  }
})();
