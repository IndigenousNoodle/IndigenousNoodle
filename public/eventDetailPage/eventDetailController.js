(function(){

  angular.module("app.eventDetail", [])
    .controller('eventDetailController', eventDetailController);

  eventDetailController.$inject = ['$state', 'eventsService', 'getEvent'];

  function eventDetailController($state, eventsService, getEvent){

    var vm = this;
    vm.join = join;

    vm.details = getEvent.data;

    /////////////////////////

    function join(){

      var eventData = vm.details;

      eventsService.joinEvent(eventData)
      .then(function(data){
        $state.go("homepage");
      }, function(err){
        console.log("ERROR === ", err);
      });
    }

    
  }

})();