(function() {
  angular.module('app.profilePage',[])

  .controller('profilePageController', profilePageController);

  profilePageController.$inject = ['$http','getUserProfilePrep', 'usersService', 'getUserReviewsServicePrep', 'reviewService', 'amazonS3Service'];

  function profilePageController ($http, getUserProfilePrep, usersService, getUserReviewsServicePrep, reviewService, amazonS3Service) {
    var vm = this;

    vm.user = getUserProfilePrep.data;
    console.log("vm.user === ", vm.user);
    vm.reviews = getUserReviewsServicePrep.data.reviewsData;

    vm.uploadImage = uploadImage;
    vm.uploadAboutMe = uploadAboutMe;


    ///////////////////////////

    function uploadImage () {
      amazonS3Service.uploadImageUser();
    }

    function uploadAboutMe(aboutMe) {
      usersService.uploadAboutMe(aboutMe);
    }
  }
})();
