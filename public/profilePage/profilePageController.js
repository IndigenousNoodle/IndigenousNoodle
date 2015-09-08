(function() {
  angular.module('app.profilePage',[])

  .controller('profilePageController', profilePageController);

  profilePageController.$inject = ['$http','getUserProfilePrep', 'usersService', 'getUserReviewsServicePrep', 'reviewService'];

  function profilePageController ($http, getUserProfilePrep, usersService, getUserReviewsServicePrep, reviewService) {
    var vm = this;
    vm.user = getUserProfilePrep.data;
    vm.uploadImage = uploadImage;
    vm.reviews = getUserReviewsServicePrep.data.reviewsData;

    function uploadImage () {
      usersService.uploadImage();
    }
  }
})();
