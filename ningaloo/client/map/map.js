Template.map.helpers({
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: function() {
    let latLng = Geolocation.latLng();
    var pulse = JSON.stringify(latLng)

    $('#lat').html("Lattitude  " + latLng.lat.toFixed(6))
    $('#lon').html("Longitude  " + latLng.lng.toFixed(6))

    console.log(latLng)
  }
});