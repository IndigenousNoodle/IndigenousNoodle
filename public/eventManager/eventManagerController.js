angular.module('app.eventManager',[])

.controller('eventManagerController', eventManagerController);
eventManagerController.$inject = ['getEventsPrep'];

function eventManagerController (getEventsPrep) {
  var vm = this;
  vm.events = getEventsPrep.data.hostedEvents;
}

