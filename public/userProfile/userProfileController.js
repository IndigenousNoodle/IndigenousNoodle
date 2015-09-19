(function() {
  angular.module('app.userProfile',[])

  .controller('userProfileController', userProfileController);
  userProfileController.$inject = ['getProfilePrep', 'getPublicUserReviewsServicePrep', 'reviewService'];

  function userProfileController (getProfilePrep, getPublicUserReviewsServicePrep, reviewService) {
    $('#nav-header').addClass("nav-color")

    var vm = this;

    vm.user = getProfilePrep.data;
    vm.reviews = getPublicUserReviewsServicePrep.data.reviewsData;
    console.log("getPublicUserReviewsServicePrep: ", getPublicUserReviewsServicePrep);
  }
})();

// public profile