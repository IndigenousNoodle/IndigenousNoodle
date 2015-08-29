(function(){

  angular.module("app.eventDetail", [])
    .controller('eventDetailController', eventDetailController);

  eventDetailController.$inject = ['$state', 'dataservice', 'sendEvent'];

  function eventDetailController($state, dataservice, sendEvent){
    // use the navBarApp?
    var vm = this;
    vm.join = join;

    vm.details = sendEvent.getCurrentEvent();

    /////////////////////////

    // must have a get request for information about the host
    // might need to modify host schema for description of host
    // get join button work

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

    
  }

})();