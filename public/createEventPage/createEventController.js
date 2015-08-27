angular.module("app.createEvent", [])
  .controller('createEventController', createEventController);

createEventController.$inject = ['$http'];

function createEventController($http){
  // use the navBarApp?
  var vm = this;
  vm.location = "Paris";


  //////////////////////

  vm.submit = function(valid){
    if (valid){
      // submit to database
      var eventData = {host: this.host, title: this.title, city: this.city, time: this.time, description: this.description};
      $http.post('/postEvents', eventData)
      .then(function(data){
        console.log("DATA === ", data);
      }, function(err){
        console.log("ERROR === ", err);
      });
    }
    console.log("valid === ", valid);
  }
}