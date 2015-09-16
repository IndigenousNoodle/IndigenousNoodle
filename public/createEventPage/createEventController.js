(function(){
    angular.module("app.createEvent", [])
    .controller('createEventController', createEventController);

  createEventController.$inject = ['$state', 'usersAndEventsService', 'amazonS3Service'];

  function createEventController($state, usersAndEventsService, amazonS3Service){
    // use the navBarApp?
    var vm = this;
    vm.submit = submit;

    vm.minDate = new Date();
    vm.activeDate;
    vm.selectedDates = [new Date().setHours(0, 0, 0, 0)];
    vm.identity = angular.identity;
    vm.uploadImage = uploadImage;

    vm.removeFromSelected = function(dt) {
      vm.selectedDates.splice(vm.selectedDates.indexOf(dt), 1);
    }
    // Testing
    // vm.title = "Hiking";
    // vm.city = "San Francisco";
    // vm.description = "Come with me to hike in Yosemite";


    /////////////////////////////////
    //Sends data from form to server to create a new document/event in database
    function submit(validTime){
      if (this.title && this.city && this.description && this.address && this.price){
        var file = document.getElementById("image").files[0];
        var imageUrl = "https://s3-us-west-2.amazonaws.com/localhosts/" + file.name;

        var eventData = {title: this.title,
                        city: this.city.toLowerCase(),
                        state: vm.state,
                        time: vm.selectedDates,
                        description: this.description,
                        address: this.address,
                        price: this.price,
                        photoUrl: imageUrl
                        };
        
        usersAndEventsService.postEvent(eventData)
        .then(function(data){
          console.log("going homepage");
          $state.go('homepage');
        }, function(err){
          console.log("ERROR === ",err);
        });
        
      }
    }

    //Requests URL from server and then directly uploads image to AWS S3
    function uploadImage () {
      amazonS3Service.uploadImageEvent();
    }
  }
})();

