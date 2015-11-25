
Template.map.helpers({
  // geolocationError: function() {
  //   var error = Geolocation.error();
  //   return error && error.message;
  // },
  mapOptions: function() {
    let latLng = Geolocation.latLng();
    var pulse = JSON.stringify(latLng)

    $('#lat').html(latLng.lat.toFixed(6))
    $('#lon').html(latLng.lng.toFixed(6))
    $('#coord_cont').html("Current Coordinates")

    console.log(latLng)
  }
});