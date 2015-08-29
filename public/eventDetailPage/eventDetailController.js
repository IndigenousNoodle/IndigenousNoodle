(function(){

  angular.module("app.eventDetail", [])
    .controller('eventDetailController', eventDetailController);

  eventDetailController.$inject = ['$state', 'dataservice'];

  function eventDetailController($state, dataservice){
    // use the navBarApp?
    var vm = this;
    vm.join = join;

    /////////////////////////

    // must have a get request for the event
    // must have a get request for information about the host

    function join(){
      // push user onto list of events
      // update users joined events
      console.log("joining");

      var eventData = {id: 1, val: "hardcoded"};
      var joiner = "Lisa";
      var host = "Michael";

      dataservice.joinEvent({eventData: eventData, joiner: joiner, host: host})
      .then(function(data){
        console.log("DATA === ", data);
      }, function(err){
        console.log("ERROR === ", err);
      });
    }

    function getEvent(){
      
    }
  }

})();