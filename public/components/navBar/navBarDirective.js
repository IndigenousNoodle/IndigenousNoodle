(function(){
  angular.module('app.navbar', ['ui.bootstrap'])
    .controller('navController', navController)
    .directive('navigationBar', navBar);

  navBar.$inject = [];
  navController.$inject = ['$scope', '$state', 'Auth'];

  function navController($scope, $state, Auth){
  
    $scope.checkAuth = function() {
      if (Auth.isAuth()) {
        $scope.signinoutMessage = 'Sign Out';
        $scope.signinout = Auth.signout;
      } else {
        $scope.signinoutMessage = 'Sign In';
        $scope.signinout = function() {
          $state.go('signin');
        };
      }
    }
  }

  function navBar(Auth){
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      templateUrl: "./components/navBar/navBarTemplate.html"
    };
  }
})();

