(function(){

    angular.module("app.createEvent", [])
    .controller('createEventController', createEventController);

  createEventController.$inject = ['$state', 'usersAndEventsService'];

  function createEventController($state, usersAndEventsService){
    // use the navBarApp?
    var vm = this;
    vm.submit = submit;

    // Testing
    // vm.title = "Hiking";
    // vm.city = "San Francisco";
    // vm.description = "Come with me to hike in Yosemite";


    /////////////////////////////////

    function submit(valid){
      if (valid && this.title && this.city && this.description){

        console.log("submiting");

        var eventData = {title: this.title, city: this.city.toLowerCase(), time: this.time, description: this.description};
        
        usersAndEventsService.postEvent(eventData)
        .then(function(data){
          $state.go('homepage');
        }, function(err){
          console.log("ERROR === ",err);
        });
        
      }
    }
  }
})();