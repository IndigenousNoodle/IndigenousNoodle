(function(){
  angular.module('app.navbar', ['ui.bootstrap'])
    .controller('navController', navController)
    .directive('navigationBar', navBar);

  navBar.$inject = [];

  function navBar(Auth){
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      templateUrl: "./components/navBar/navBarTemplate.html",
      controller: navController,
      controllerAs: 'navController'
    };
  }

  navController.$inject = ['$state', 'Auth'];

  function navController($state, Auth){

    var vm = this;
    vm.checkAuth = checkAuth;

    function checkAuth() {
      if (Auth.isAuth()) {
        vm.signinoutMessage = 'Sign Out';
        vm.signinout = Auth.signout;
      } else {
        vm.signinoutMessage = 'Sign In';
        vm.signinout = signinout;

        function signinout() {
          $state.go('signin');
        };
      }
    }
  }
})();

