(function(){
  angular
      .module('app.dataservice')
      .factory('eventsService', eventsService)

  eventsService.$inject = ['$http'];

  function eventsService ($http) {
    return {
      getEventList: getEventList
    }

    function getEventList(city){
      return $http({method: 'GET', url: '/events/' + city});
    }
  }

}());