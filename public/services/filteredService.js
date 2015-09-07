(function() {
  angular
    .module('app.dataservice')
    .factory('filteredService', filteredService)

    function filteredService() {
      return {
        setFiltered: setFiltered,
        getFiltered: getFiltered
      }

      var filtered = [];

      function setFiltered(data) {
        filtered = data;
      }

      function getFiltered() {
        if(filtered === undefined) {
          filtered = [];
        }
        return filtered;
      };

    }      

})();