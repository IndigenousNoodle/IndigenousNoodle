(function() {
  angular.module('app.eventManager',[])

  .controller('eventManagerController', eventManagerController);

  eventManagerController.$inject = ['getEventsPrep', 'usersService'];

  function eventManagerController (getEventsPrep, usersService) {
  }
})();
