(function(){

  angular.module("app.eventDetail", [])
    .controller('eventDetailController', eventDetailController);

  eventDetailController.$inject = ['$state', 'dataservice', 'getEvent'];

  function eventDetailController($state, dataservice, getEvent){
    // use the navBarApp?
    var vm = this;
    vm.join = join;

    vm.details = getEvent.data;

    /////////////////////////

    // must have a get request for information about the host
    // might need to modify host schema for description of host
    // get join button work

    function join(){
      // push user onto list of events
      // update users joined events
      console.log("joining");

      var eventData = vm.details;

      dataservice.joinEvent(eventData)
      .then(function(data){
        $state.go("homepage");
      }, function(err){
        console.log("ERROR === ", err);
      });
    }

    
  }

})();