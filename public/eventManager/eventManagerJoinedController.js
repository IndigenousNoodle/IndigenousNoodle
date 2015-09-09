(function() {
  angular.module('app.eventManager')

  .controller('eventManagerJoinedController', eventManagerJoinedController);

  eventManagerJoinedController.$inject = ['getJoinedEventsPrep'];

  function eventManagerJoinedController (getJoinedEventsPrep) {
    var vm = this;
    vm.eventData = getJoinedEventsPrep.data;
  }
})();
