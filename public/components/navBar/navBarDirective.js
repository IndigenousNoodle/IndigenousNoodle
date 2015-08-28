(function(){
  angular.module('app.navbar', ['ui.bootstrap'])
    .directive('navigationBar', navBar);

  navBar.$inject = ['Auth'];

  function navBar(Auth){
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      templateUrl: "./components/navBar/navBarTemplate.html",
      link: function(navbar, elem, attrs) {
        navbar.signout = Auth.signout;
      }
    };
  }
})();

