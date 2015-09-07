(function() {
  angular.module('app.eventManager')

  .controller('eventManagerJoinedController', eventManagerJoinedController);

  eventManagerJoinedController.$inject = ['getJoinedEventsPrep', 'usersService'];

  function eventManagerJoinedController (getJoinedEventsPrep, usersService) {
    var vm = this;
    vm.eventData = getJoinedEventsPrep.data;
  }
})();
