(function() {
  angular.module('homepage', [])
    .controller('homepageController', homepageController)
    .directive('ngEnter', ngEnter);

  // function homepageController($http) { 
  //   var vm = this;
  //   vm.getData = function() {
  //     return $http.get('/events').success(function(data) {
  //       vm.filteredData = data.filter(function(obj) {
  //         if(obj.city.toLowerCase() === vm.findCity.toLowerCase()) {
  //           return true;
  //         }
  //         return false;
  //       });
  //     });
  //   };
  // }

  function homepageController($scope, $http) { 
    $scope.getData = function() {
      return $http.get('/events').success(function(data) {
        $scope.filteredData = data.filter(function(obj) {
          if(obj.city.toLowerCase() === $scope.findCity.toLowerCase()) {
            return true;
          }
          return false;
        });
      });
    };
  }

  function ngEnter() {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if(event.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    };
  } 
})();