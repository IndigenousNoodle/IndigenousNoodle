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

    function submit(validTime){
      if (validTime && this.title && this.city && this.description && this.address && this.price){

        var eventData = {title: this.title,
                        city: this.city.toLowerCase(),
                        time: this.time,
                        description: this.description,
                        address: this.address,
                        price: this.price};
        
        usersAndEventsService.postEvent(eventData)
        .then(function(data){
          console.log("going homepage");
          $state.go('homepage');
        }, function(err){
          console.log("ERROR === ",err);
        });
        
      }
    }
  }
})();