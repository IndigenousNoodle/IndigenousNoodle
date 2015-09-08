(function() {
  angular.module('app.eventManager')

  .controller('eventManagerJoinedController', eventManagerJoinedController);

  eventManagerJoinedController.$inject = ['getJoinedEventsPrep', 'usersService', '$modal'];

  function eventManagerJoinedController (getJoinedEventsPrep, usersService, $modal) {
    
    var vm = this;
    vm.eventData = getJoinedEventsPrep.data;

    vm.reviewModal = reviewModal;

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

  }
})();

