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
      findGeoLocation: findGeoLocation,
      initializeAllMarkers: initializeAllMarkers
    };

    ///////////////////////////////////////////
    function getMapApi(){
      return uiGmapGoogleMapApi.then(getMaps);

      function getMaps(maps){
        return maps;
      }
    }

    function initializeAllMarkers($state, eventsData, geocoder){
      var markerStorage = {};
      var counter = 0;

      eventsData.forEach(function(ev){
        
        var address = ev.address;
        var city = ev.city;

        geocoder.geocode({'address': address + " " + city}, setMarkers);


        function setMarkers(results, status){
          if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            counter++;
          } else if (status == google.maps.GeocoderStatus.OK) {
              var marker = new google.maps.Marker({
                  position: results[0].geometry.location
              });

              markerStorage[ev.address] = marker
          } else{
            console.log("Geocode was not successful for the following reason: " + status);
          }
        }
      });

      return markerStorage;
    }

    // will mark all events at the addresses retrieved

    function markAllAddresses($state, eventsData, map, geocoder){
      // iterate through all the events and mark their addresses
      var markerStorage = {};
      var counter = 0;

      eventsData.forEach(function(ev){
        
        var address = ev.address;
        var city = ev.city;

        geocoder.geocode({'address': address + " " + city}, setMarkers);


        function setMarkers(results, status){
          if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            counter++;
          } else if (status == google.maps.GeocoderStatus.OK) {
              map.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location
              });

              markerStorage[ev.address] = marker;

              // same event being marked everytime
              // markerToEventDetail($state, marker, ev);
              displayEventWindow($state, marker, map, ev);
          } else{
            console.log("Geocode was not successful for the following reason: " + status);
          }
        }


      });

      return markerStorage;
    }

    function markerToEventDetail($state, marker, eventData){
      marker.addListener('click', toEventDetail);

      function toEventDetail(){
        $state.go('eventDetail', {eventId: eventData.id});
      }
    }
    function displayEventWindow($state, marker, map, eventData){
      console.log("eventData ===", eventData);

      var eventDetailNum = "#eventDetail/" + eventData.id;
      var strLimit = 25;
      if (eventData.title.length > strLimit){// arbitrary length
        eventData.title = eventData.title.substring(0,strLimit);
        eventData.title = eventData.title + "...";
      }
      var eventString = "<a href=" + eventDetailNum + ">" + "<img class='image-thumbnail' src=" + eventData.photoUrl + "></a>" +
                        "<a class='info-window-title' href=" + eventDetailNum + ">" + "<h6 class='info-window-title'>" + eventData.title + "</h6>" + "</a>" +
                        "<p class='info-window-price'>Price: $" + eventData.price + "</p>";
      var infoWindow = new google.maps.InfoWindow({
        content: eventString
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
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
        zoom: 12
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