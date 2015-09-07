(function() {
  angular.module('app.profilePage',[])

  .controller('profilePageController', profilePageController);

  profilePageController.$inject = ['$http','getUserProfilePrep', 'usersService', 'getUserReviewsServicePrep', 'reviewService', 'amazonS3Service'];

  function profilePageController ($http, getUserProfilePrep, usersService, getUserReviewsServicePrep, reviewService, amazonS3Service) {
    var vm = this;

    vm.user = getUserProfilePrep.data;
    console.log("vm.user === ", vm.user);
    vm.reviews = getUserReviewsServicePrep.data.reviewsData;

    vm.save = save;


    ///////////////////////////

    function uploadImage () {
      amazonS3Service.uploadImageUser();
    }

    function uploadAboutMe(aboutMe) {
      usersService.uploadAboutMe(aboutMe);
    }
    
    function save(aboutMe){
      console.log("this.aboutMe", aboutMe);
      if (aboutMe !== undefined){
        uploadAboutMe(aboutMe);
      }
      // remove the text from teh aboutMe after submission
      $("#aboutMe").val('');
      amazonS3Service.uploadImageUser();

    }
  }
})();