(function() {
  angular.module('app.eventManager',[])

  .controller('eventManagerController', eventManagerController);

  eventManagerController.$inject = ['getEventsPrep', 'usersService'];

  function eventManagerController (getEventsPrep, usersService) {
    var vm = this;
    vm.confirmUser = confirmUser;
    vm.eventData = getEventsPrep.data;
    vm.hosted = vm.eventData.hostedEvents;
    vm.joinedConfirmed = confirmedEvents(vm.eventData.joinedEvents);
    vm.joinedWaitListed = waitListedEvents(vm.eventData.joinedEvents);

    function confirmUser (acceptedUser, eventId) {
      usersService.confirmEvent(acceptedUser, eventId);
    }

    function confirmedEvents (events) {
      var confirmed = {};
      for (var key in events) {
        if (events[key].confirmed === true) {
          confirmed[key] = events[key];
        }
      }
      return confirmed;
    }

    function waitListedEvents (events) {
      var confirmed = {};
      for (var key in events) {
        if (events[key].confirmed === false) {
          confirmed[key] = events[key];
        }
      }
      return confirmed;
    }
  }
})();
