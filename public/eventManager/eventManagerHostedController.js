(function() {
  angular.module('app.eventManager')

  .controller('eventManagerHostedController', eventManagerHostedController);

  eventManagerHostedController.$inject = ['getHostedEventsPrep', 'usersService'];

  function eventManagerHostedController (getHostedEventsPrep, usersService) {
    var vm = this;
    vm.confirmUser = confirmUser;
    vm.eventData = getHostedEventsPrep.data;

    function confirmUser (acceptedUser, eventId, eventTimeId) {
      usersService.confirmEvent(acceptedUser, eventId, eventTimeId);
    }
  }
})();
