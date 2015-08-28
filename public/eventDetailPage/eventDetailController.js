(function(){

  angular.module("app.eventDetail", [])
    .controller('eventDetailController', eventDetailController);

  eventDetailController.$inject = ['$state', 'dataservice'];

  function eventDetailController($state, dataservice){
    // use the navBarApp?
    var vm = this;
    vm.join = join;

    /////////////////////////

    function join(){
      // push user onto list of events
      // update users joined events
      console.log("joining");
      
    }
  }

})();