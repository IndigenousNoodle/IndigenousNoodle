angular.module("app.createEvent", [])
  .controller('createEventController', createEventController);

createEventController.$inject = [];

function createEventController(){
  // use the navBarApp?
  var vm = this;
  vm.location = "Paris";
}