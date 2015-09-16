(function() {
  angular.module('app.profilePage',[])

  .controller('profilePageController', profilePageController);

  profilePageController.$inject = ['$http','getUserProfilePrep', 'usersService', 'getUserReviewsServicePrep', 'reviewService', 'amazonS3Service'];

  function profilePageController ($http, getUserProfilePrep, usersService, getUserReviewsServicePrep, reviewService, amazonS3Service) {
    var vm = this;
    vm.user = getUserProfilePrep.data;
    vm.uploadImage = uploadImage;
    vm.reviews = getUserReviewsServicePrep.data.reviewsData;

    function uploadImage () {
      amazonS3Service.uploadImageUser();
    }
  }
})();
