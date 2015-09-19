(function() {
  angular.module('app.eventManager')

  .controller('eventManagerHostedController', eventManagerHostedController);

  eventManagerHostedController.$inject = ['getHostedEventsPrep', 'usersService'];

  function eventManagerHostedController (getHostedEventsPrep, usersService) {
    $('#nav-header').addClass("nav-color")

    var vm = this;
    vm.confirmUser = confirmUser;
    vm.eventData = getHostedEventsPrep.data;


    //The host of the event can confirm and accept users.  Will disable button.  Users who joined the event will
    //be moved from waitlisted to confirmed
    function confirmUser (acceptedUser, eventId, eventTimeId) {
      usersService.confirmEvent(acceptedUser, eventId, eventTimeId);
    }
  }
})();
