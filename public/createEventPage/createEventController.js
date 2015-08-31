(function(){

    angular.module("app.createEvent", [])
    .controller('createEventController', createEventController);

  createEventController.$inject = ['$state', 'dataservice'];

  function createEventController($state, dataservice){
    // use the navBarApp?
    var vm = this;
    vm.submit = submit;

    // Testing
    vm.host = "Michael";
    vm.title = "Hiking";
    vm.city = "San Francisco";
    vm.description = "Come with me to hike in Yosemite";
    // vm.time = "2015-08-29T09:00:00";


    /////////////////////////////////

    function submit(valid){
      if (valid && this.host && this.title && this.city && this.description){

        console.log("submiting");

        var eventData = {host: this.host, title: this.title, city: this.city.toLowerCase(), time: this.time, description: this.description};
        
        dataservice.postEvent(eventData)
        .then(function(data){
          $state.go('homepage');
        }, function(err){
          console.log("ERROR === ",err);
        });
        
      }
    }
  }
})();