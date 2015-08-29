(function() {
  angular.module('eventList', [])
    .controller('eventListController', eventListController)

    function eventListController(getEventList) {
      var vm = this;
      vm.getEventList = getEventList.data;
    }
})();