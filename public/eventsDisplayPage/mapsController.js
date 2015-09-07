(function(){

    angular.module("app.maps", [])
    .controller('mapsController', createMapsController);

  createMapsController.$inject = ['$state', 'usersAndEventsService', 'getMaps', 'getCity', 'getEventList', 'googleMap'];

  function createMapsController($state, usersAndEventsService, getMaps, getCity, getEventList, googleMap){
    // use the navBarApp?
    var vm = this;

    var map = initializeGoogleMaps(getMaps, getCity, getEventList, $state, googleMap);
    getMaps.event.trigger(map, 'resize');
  }


  ///////////////////////////////////////////////////

  function initializeGoogleMaps(getMaps, getCity, getEventList, $state, googleMap){
    console.log("getMaps === ", getMaps);

    // can refactor to getInitialMap to googleMapService
    map = new getMaps.Map(document.getElementById('map'), googleMap.getMapObject());

    document.getElementById('map').style.height = "600px";
    document.getElementById('map').style.width = "600px";
    
    var geocoder = new getMaps.Geocoder();

    // googleMapService functions
    googleMap.markAllAddresses($state, getEventList.data, map, geocoder);
    googleMap.findCityLocation(map, geocoder, getCity);

    return map;
  }

})();