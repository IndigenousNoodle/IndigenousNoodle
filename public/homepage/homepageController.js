angular.module('homepage', [])
  .controller('homepageController', homepageController)
  .directive('ngEnter', function() {
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
  });

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