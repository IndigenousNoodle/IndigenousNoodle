(function() {
  angular.module('app.eventManager',[])

  .controller('eventManagerController', eventManagerController);

  $('#nav-header').addClass("nav-color")

  eventManagerController.$inject = ['getEventsPrep', 'usersService'];

  function eventManagerController (getEventsPrep, usersService) {
  }
})();
