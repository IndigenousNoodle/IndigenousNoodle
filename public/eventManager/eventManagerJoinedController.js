(function() {
  angular.module('app.eventManager')

  .controller('eventManagerJoinedController', eventManagerJoinedController);

  eventManagerJoinedController.$inject = ['getJoinedEventsPrep', 'usersService', '$modal', 'eventsService'];

  function eventManagerJoinedController (getJoinedEventsPrep, usersService, $modal, eventsService) {
    
    var vm = this;
    vm.eventData = getJoinedEventsPrep.data;
    vm.reviewModal = reviewModal;
    vm.cancelEvent = cancelEvent;

    // create modal view using ui.bootstrap
    function reviewModal(event) {
      var modalInstance = $modal.open({
        templateUrl: './eventManager/eventReviewTemplate.html',
        controller: 'modalInstanceCtrl',
        controllerAs: 'modal',
        resolve: {
          event: function () {
            return event;
          }
        }
      });
    }


    //Allows user to cancel event (if the host has not accepted)
    function cancelEvent (eventJoined){
      console.log(eventJoined)
      eventsService.cancelEvent(eventJoined);
      for (var i = 0; i < vm.eventData.joinedEvents.length; i++) {
        if (vm.eventData.joinedEvents[i].id === eventJoined.id && vm.eventData.joinedEvents[i].eventTimeId === eventJoined.eventTimeId) {
          vm.eventData.joinedEvents.splice(i,1);
        }
      }
    }

  }
})();

