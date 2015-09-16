(function() {
  angular.module('app.eventManager')
    .controller('modalInstanceCtrl', modalInstanceCtrl)

    modalInstanceCtrl.$inject = ['$modalInstance', 'event', 'reviewService'];


      function modalInstanceCtrl ($modalInstance, event, reviewService) {

      var vm = this;
      vm.event = event;
      vm.max = 5; // max stars

      vm.hoveringOver = hoveringOver;
      vm.ok = ok;
      vm.cancel = cancel;

      function hoveringOver(value) {
        vm.overStar = value;
      }

      function ok(review) {
        // close modal, need to inject $modalInstance
        $modalInstance.close();

        // save review
        var reviewData = {
          rating: review.rating,
          review: review.text,
          usersHostId: event.hostId,
          eventsId: event.id
        };

        console.log('review: ', reviewData);

        reviewService.saveReviewAjax(reviewData)
        .then(function(data){
          console.log("saveReview ctrl: ", data);
        }, function(err){
          console.log("saveReview ctrl err: ",err);
        });
      }

      function cancel() {
        $modalInstance.dismiss('cancel');
      }

    }

})();
