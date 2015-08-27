angular.module('app.navbar')
  .directive('navigationBar', navBar);

navBar.$inject = [];

function navBar(){
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    templateUrl: "./components/navBar/navBarTemplate.html"
  }
}