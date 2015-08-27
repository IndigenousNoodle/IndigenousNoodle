angular.module("app.createEvent", [])
  .controller('createEventController', createEventController);

createEventController.$inject = [];

function createEventController(){
  // use the navBarApp?
  var vm = this;
  vm.location = "Paris";


  //////////////////////

  vm.submit = function(valid){
    if (valid){
      // submit to database
    }
    console.log("valid === ", valid);
  }
}