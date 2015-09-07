(function(){
  angular
    .module('app.dataservice')
    .factory('googleMap', googleMap)

  googleMap.$inject = ['uiGmapGoogleMapApi'];

  function googleMap(uiGmapGoogleMapApi){

    return {
      getMapApi: getMapApi,
      getMapObject: getMapObject,
      markAllAddresses: markAllAddresses,
      findCityLocation: findCityLocation,
      findGeoLocation: findGeoLocation
    };

    ///////////////////////////////////////////
    function getMapApi(){
      return uiGmapGoogleMapApi.then(getMaps);

      function getMaps(maps){
        return maps;
      }
    }

    // will mark all events at the addresses retrieved
    function markAllAddresses($state, eventsData, map, geocoder){

      // iterate through all the events and mark their addresses
      eventsData.forEach(function(ev){
        
        var address = ev.address;
        var city = ev.city;

        geocoder.geocode({'address': address + " " + city}, setMarkers);

        function setMarkers(results, status){
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

            // same event being marked everytime
            markerToEventDetail($state, marker, ev);
          }
          else{
            console.log("Geocode was not successful for the following reason: " + status);
          }
        }


      });
    }

    function markerToEventDetail($state, marker, eventData){
      marker.addListener('click', toEventDetail);

      function toEventDetail(){
        $state.go('eventDetail', {eventId: eventData.id});
      }
    }

    // gets the passed cities location and moves map there
    function findCityLocation(map, geocoder, city){
      geocoder.geocode({'address': city}, setCityLocation);

      function setCityLocation(results, status){
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
        }
        else{
          console.log("Geocode was not successful for the following reason: " + status);
        }
      }

    }

    function getMapObject(){
      return {
        center: new google.maps.LatLng(-40, 130),
        zoom: 8
      };
    }

    // finds the users geolocation and creates a popup there
    function findGeoLocation(map, infoWindow){
      // var infoWindow = new map.InfoWindow({map: map});

      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(setPosition, positionError);
      }else{
        // browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

      // browser doesn't support geolocation
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

      function setPosition(position){
        var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

        infoWindow.setPosition(pos);
        infoWindow.setContent("I've been watching you");
        map.setCenter(pos);
      }

      function positionError(){
        handleLocationError(true, infoWindow, map.getCenter());
      }
    }

  }
})();