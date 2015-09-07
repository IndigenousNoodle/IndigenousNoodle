(function(){

    angular.module("app.maps", [])
    .controller('mapsController', createMapsController);

  createMapsController.$inject = ['$state', 'usersAndEventsService', 'getMaps', 'getCity', 'getEventList', 'googleMap', 'filteredService', '$scope'];

  function createMapsController($state, usersAndEventsService, getMaps, getCity, getEventList, googleMap, filteredService, $scope){
    // use the navBarApp?
    var vm = this;

    vm.filtered = filteredService.getFiltered();
    vm.filteredMarker = null;

    var makeMap = initializeGoogleMaps(getMaps, getCity, getEventList, $state, googleMap);

    $scope.$watchCollection(
      function watchFiltered( scope ) {
        // Return the "result" of the watch expression.
        return( vm.filtered );
      },
      function handleFilteredChange( newValue, oldValue ) {
        for(var key in vm.markers) {
          vm.markers[key].setMap(null);
        }

        if(vm.filteredMarker !== null) {        
          for(var key in vm.filteredMarker) {
            vm.filteredMarker[key].setMap(null);
          }
        }

        for(var i = 0; i < vm.filtered.length; i++) {
          for(var key in vm.markers) {
            if(vm.filtered[i].address === key) {
              vm.markers[key].setMap(vm.map)
            }
          }
        }
    });


    getMaps.event.trigger(map, 'resize');

    function initializeGoogleMaps(getMaps, getCity, getEventList, $state, googleMap){

      // can refactor to getInitialMap to googleMapService
      vm.map = new getMaps.Map(document.getElementById('map'), googleMap.getMapObject());

      document.getElementById('map').style.height = "600px";
      document.getElementById('map').style.width = "600px";
      
      vm.geocoder = new getMaps.Geocoder();

      // googleMapService functions

      // On initalization, we get all events again.
      if(vm.filtered.length === 0) {
        vm.markers = googleMap.markAllAddresses($state, getEventList.data, vm.map, vm.geocoder);
      } else {
        vm.markers = googleMap.initializeAllMarkers($state, getEventList.data, vm.geocoder);
        vm.filteredMarker = googleMap.markAllAddresses($state, vm.filtered, vm.map, vm.geocoder);
      }
      googleMap.findCityLocation(vm.map, vm.geocoder, getCity);
      return vm.map;
    }
  }

  ///////////////////////////////////////////////////


})();