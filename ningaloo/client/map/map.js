
// Mapbox.load();
// Tracker.autorun(function () {
//   if (Mapbox.loaded()) {

//     Meteor.call('getMapBoxKey', function(error, result){
//       if (!error) {
//         L.mapbox.accessToken = result
//         let map = L.mapbox.map('map', 'avinoz.o11688nh');
//       } else {
//         console.log(error)
//       }
//     })
//   }
// });


// Template.map.helpers({
//   geolocationError: function() {
//     var error = Geolocation.error();
//     return error && error.message;
//   },
//   mapOptions: function() {
//     let latLng = Geolocation.latLng();
//     var pulse = JSON.stringify(latLng)

//     $('#lat').html(latLng.lat.toFixed(6))
//     $('#lon').html(latLng.lng.toFixed(6))
//     $('#coord_cont').html("Current Coordinates")

//     console.log(latLng)

//     // INITIALIZE THE MAP WHEN WE HAVE COORDS
//     if (GoogleMaps.loaded() && latLng) {
//       return {
//         center: new google.maps.LatLng(latLng.lat, latLng.lng),
//         // zoom: MAP_ZOOM
//       };
//     }
//   }
// });


////////////
Mapbox.load();
Tracker.autorun(function () {
  if (Mapbox.loaded()) {
    L.mapbox.accessToken = 'pk.eyJ1IjoiamF0bzQiLCJhIjoiY2loOXFma2F6MHUyZ3Uwa2xrbGc3eTUzNSJ9.A_hh1IRqqzuoytmTkJ-2GQ';
    var map = L.mapbox.map('map', 'mapbox.streets');
  }
});

Template.map.helpers({
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: function() {
    let latLng = Geolocation.latLng();
    var pulse = JSON.stringify(latLng)

    $('#lat').html(latLng.lat.toFixed(6))
    $('#lon').html(latLng.lng.toFixed(6))
    $('#coord_cont').html("Current Coordinates")

    L.marker([22.03501,113.54410]).addTo(mapLeaflet);
    L.marker([37.775408,-122.413682]).addTo(mapLeaflet);

    console.log(latLng)

    // INITIALIZE THE MAP WHEN WE HAVE COORDS
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        // zoom: MAP_ZOOM  // GOOGLE MAP OPTIONS
      };
    }
  }
});

Template.map.onRendered(function () {
  Mapbox.debug = true;
  Mapbox.load({
    plugins: ['markercluster', 'heat', 'Leaflet']
  });

  this.autorun(function () {
    if (Mapbox.loaded()) {
      L.mapbox.accessToken = 'pk.eyJ1IjoiamF0bzQiLCJhIjoiY2loOXFma2F6MHUyZ3Uwa2xrbGc3eTUzNSJ9.A_hh1IRqqzuoytmTkJ-2GQ';
      var map = L.mapbox.map('map', 'mapbox.streets')
      var view = map.setView([-22.03501, 113.54410], 6)

      // ADDS PIN TO MAP WITH HARD-CODE LAT/LNG ################
      L.marker([-22.0, 113.5]).addTo(map);
      L.marker([-22.0, 114.5]).addTo(map);
      L.marker([37.775408,-122.413682]).addTo(map);
      L.market([latLng.lat, latLng.lng])

      // ##### JSON STYLE OPTION FOR ADDING A PIN TO THE MAP
      // L.mapbox.featureLayer({
      //   type: 'Feature',
      //   geometry: {
      //     type: 'Point',
      //     coordinates: [
      //     -22.03501,
      //     113.54410
      //     ]
      //   },

      //   properties: {
      //     title: 'Ningaloo',
      //     description: '',
      //     'marker-size': 'large',
      //     'marker-color': '#BE9A6B',
      //     'marker-symbol': 'default'
      //   }
      // }).addto(map)
      // -22.03501,113.54410
    }
  });

  this.autorun(function () {
    if (Mapbox.loaded()) {
      geojson = Tasks.find().fetch()
      view.featureLayer.setGeoJSON(geojson);
    }
  });
});


// OPTION FOR USING GOOGLE MAPS

// var MAP_ZOOM = 20;

// Meteor.startup(function() {
//   GoogleMaps.load();
// });

// Template.map.onCreated(function() {
//   var self = this;

//   GoogleMaps.ready('map', function(map) {
//     var marker;

//     // Create and move the marker when latLng changes.
//     self.autorun(function() {
//       var latLng = Geolocation.latLng();
//       if (! latLng)
//         return;

//       // If the marker doesn't yet exist, create it.
//       if (! marker) {
//         marker = new google.maps.Marker({
//           position: new google.maps.LatLng(latLng.lat, latLng.lng),
//           map: map.instance
//         });
//       }
//       // The marker already exists, so we'll just change its position.
//       else {
//         marker.setPosition(latLng);
//       }

//       // Center and zoom the map view onto the current position.
//       map.instance.setCenter(marker.getPosition());
//       map.instance.setZoom(MAP_ZOOM);
//     });
//   });
// });
