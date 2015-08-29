(function() {
  angular.module('homepage', [])
    .controller('homepageController', homepageController)
    .directive('ngEnter', ngEnter);

  homepageController.$inject = ['$state'];

  function homepageController($state) { 
    var vm = this;
    
    vm.displayEvents = displayEvents;

    function displayEvents() {
      $state.go('eventList', {city: vm.findCity});
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


