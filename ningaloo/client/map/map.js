
Mapbox.load();

Template.map.onRendered(function () {
  Mapbox.debug = true;
  Mapbox.load({
    plugins: ['Leaflet']
  });

  this.autorun(function () {
    if (Mapbox.loaded()) {

      Meteor.call('getMapBoxKey', function(error, result){
        if (!error) {
          L.mapbox.accessToken = result
          let map = L.mapbox.map('map', 'avinoz.o7nj93k2');
          map.setView([-21.854578, 114.103581], 12, {pan: {animate: true, duration: 2}, zoom: {animate: true}})
          // ADDS PIN TO MAP WITH HARD-CODE LAT/LNG
          // L.marker([-21.847727, 114.033028]).addTo(map);

          // ALLOWS MARKERS COLOR CHANGE
          var myLayer = L.mapbox.featureLayer().addTo(map);
          var geoJson = [{
            type: 'Feature',
            "geometry": { "type": "Point", "coordinates": [114.033028, -21.847727]},
            "properties": {
              // "image": "images/trans.png",
              "marker-color": "#ff8888",
              "title": "Turtle Town",
              "url": "https://en.wikipedia.org/wiki/Chicago"
              // "marker-size": "large",
            }
            }, {
            type: 'Feature',
            "geometry": { "type": "Point", "coordinates": [114.091414, -21.810967]},
            "properties": {
              // "image": "images/trans.png",
              "title": "Flipped Turtle",
              "url": "https://en.wikipedia.org/wiki/Chicago",
              "marker-color": "#7ec0ee"
          }
            }];

            // ADDS POPUP WINDOW

            myLayer.on('layeradd', function(e) {
              var marker = e.layer,
                  feature = marker.feature;

              var popupContent = '<a target="_blank" class="popup" href="' + feature.properties.url + '">' + feature.properties.title + '</a>'; //'<img src="' + feature.properties.image + '" />' +

              // http://leafletjs.com/reference.html#popup
              marker.bindPopup(popupContent,{
                  closeButton: false,
                  minWidth: 100,
                  keepInView: true,
              });
            });

        // ADDS DATA TO MAP
        myLayer.setGeoJSON(geoJson);
        } else {
          console.log(error)
        }
      })
    }
  });

  this.autorun(function () {
    if (Mapbox.loaded()) {
      geojson = Tasks.find().fetch()
      view.featureLayer.setGeoJSON(geojson);
    }
  });
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
