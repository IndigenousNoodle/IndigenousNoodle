(function() {
  angular.module('homepage', [])
    .controller('homepageController', homepageController)
    .directive('ngEnter', ngEnter);

  homepageController.$inject = ['getEvents'];

  function homepageController(getEvents) { 
    var vm = this;
    vm.filteredData;
    vm.getData = getData;

    function getData() {
      getEvents.getEvent()
      .then(function(data) {
        console.log(data);
        vm.filteredData = data.filter(function(obj) {
          if(obj.city.toLowerCase() === vm.findCity.toLowerCase()) {
            return true;
          }
          return false;
        });
      })
    }
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