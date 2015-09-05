(function() {
  angular.module('app.eventManager',[])

  .controller('eventManagerController', eventManagerController);

  eventManagerController.$inject = ['getEventsPrep', 'usersService'];

  function eventManagerController (getEventsPrep, usersService) {
    var vm = this;
    vm.confirmUser = confirmUser;
    vm.eventData = getEventsPrep.data;

    function confirmUser (acceptedUser, eventId) {
      usersService.confirmEvent(acceptedUser, eventId);
    }
  }
})();
