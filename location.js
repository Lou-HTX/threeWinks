  var map, infoWindow, location, city, state;

  var cityName = function(pos) {
    let lat = pos.lat;
    let lng = pos.lng;

    $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=true', function(data) {
      myLocation(data);
    });
  };

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 29.728, lng: -95.54853},
      zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        console.log(pos, position);
        cityName(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  function myLocation(location){
    console.log(location);
    loc = location.results[3].address_components;
    city = loc[0].long_name;
    state = loc[2].short_name;
    console.log(loc, city, state);
    weatherAPI(city, state);
  }