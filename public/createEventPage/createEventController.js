angular.module("app.createEvent", [])
  .controller('createEventController', createEventController);

createEventController.$inject = ['$http', '$state'];

function createEventController($http, $state){
  // use the navBarApp?
  var vm = this;
  vm.location = "Paris";


  //////////////////////

  vm.submit = function(valid){
    if (valid && this.host && this.title && this.city && this.description){
      console.log("submiting");

      var eventData = {host: this.host, title: this.title, city: this.city, time: this.time, description: this.description};
      $http.post('/postEvents', eventData)
      .then(function(data){
        console.log("DATA === ", data);
        // send user to the profile page
        $state.go('homepage');
      }, function(err){
        console.log("ERROR === ", err);
      });
    }
    console.log("valid === ", valid);
  }
}