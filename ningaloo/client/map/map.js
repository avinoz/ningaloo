Template.map.helpers({
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: function() {
    let latLng = Geolocation.latLng();
    var pulse = JSON.stringify(latLng)

    $('#lat').html(latLng.lat)
    $('#lon').html(latLng.lng)
    $('#coord_cont').html("Current Coordinates")

    console.log(latLng)
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: MAP_ZOOM
      };
    }
  }
});

Template.map.events({
  'click': function(event){

     // $('.map_append').append(pulse)

      // ### CREATES K/V OBJECT
      // var turtlelog = {division: field1, section: field2, subsection: field3, turtleSpecies: field4, latLng.lat, latLng.lng}
      // console.log(turtlelog)

    },
})
