(function() {
  angular.module('app.userProfile',[])

  .controller('userProfileController', userProfileController);
  userProfileController.$inject = ['getProfilePrep'];

  function userProfileController (getProfilePrep) {
    var vm = this;
    vm.user = getProfilePrep.data;
  }
})();
