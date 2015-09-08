(function() {
  angular.module('app.profilePage',[])

  .controller('profilePageController', profilePageController);

  profilePageController.$inject = ['$http','getUserProfilePrep', 'usersService'];

  function profilePageController ($http, getUserProfilePrep, usersService) {
    var vm = this;
    vm.user = getUserProfilePrep.data;
    vm.uploadImage = uploadImage;
    console.log("user: ", vm.user);

    function uploadImage () {
      usersService.uploadImage();
    }
  }
})();
