
Mapbox.load();

// Template.desktop.onCreated(function(){
//   this.subscribe("turtlelogs",25)
// });

Template.desktop.helpers({
    turtlelogs: function (e) {  //change in list.html
      return TurtleLogs.find({}, {sort: {date: -1}});
      }
});


Template.desktop.onRendered(function () {
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
          // L.marker([37.784920, -122.398024]).addTo(map);




          // ALLOWS MARKERS COLOR CHANGE
          var myLayer = L.mapbox.featureLayer().addTo(map);
          var millisecondsToDays = function(milliseconds){
            var seconds = milliseconds/1000;
            var minutes = seconds/60;
            var hours = minutes/60;
            var days = hours/24;
            return days;
          };

          var statusColor = function(obj){
            var now = new Date();
            var daysAgo = millisecondsToDays(now)-millisecondsToDays(obj.date);

            if(daysAgo<=7){
              return "#8ECBBE"
            }else if(daysAgo<=45){
              return "#5EBEA5"
            }else if(daysAgo<=60){
              return "#2AA285"
            }else{
              return "#D3D3D3"
            }
          }

          // var statusColorLogs = function(obj){
          //   var now = new Date();
          //   var daysAgo = millisecondsToDays(now)-millisecondsToDays(new Date(obj.date));

          //   if(daysAgo<=7){
          //     return "#8ECBBE"
          //   }else if(daysAgo<=45){
          //     return "#5EBEA5"
          //   }else if(daysAgo<=60){
          //     return "#2AA285"
          //   }else{
          //     return "#EF6583"
          //   }
          // }
          // TESTING DYNAMIC MARKERS STATUS:WORKING ########
          // Marker position is reflected by latLng positions in turtlelog object

          // var points_array2 = []
          // TurtleLogs.find({}).forEach(function(obj, idx, arr){
          //   // console.log(obj)
          //   // console.log(idx);
          //   // console.log(obj.turtlelog.latLng);
          //   if(obj.turtlelog.latLng.lat.length!==0){
          //   var geoJson2 = {
          //     type:'Feature',
          //     "geometry":{
          //       "type":"Point",
          //       "coordinates":[obj.turtlelog.latLng.lon, obj.turtlelog.latLng.lat]
          //     },
          //     "properties":{
          //       "marker-color":statusColor(obj),
          //       "title":obj.turtlelog.turtleSpecies,
          //       "url":""
          //     }
          //   }
          //   console.log(geoJson2);


          //     points_array2.push(geoJson2);
          //   }
          // });

          var points_array = []
          TurtleLogs.find({}).forEach(function(obj, idx, arr){
            // console.log(obj)
            // console.log(idx);
            // console.log(obj.turtlelog.latLng);
            if(obj.loc.coordinates.length!==0){
            var geoJson = {
              type:'Feature',
              "geometry":{
                "type":"Point",
                "coordinates":[obj.loc.coordinates[0], obj.loc.coordinates[1]]
              },
              "properties":{
                "marker-color": statusColor(obj),
                "title":obj.species,
                "url":""
              }
            }

              points_array.push(geoJson);
            }
          });


          function coord(v) {
            var coords = v.replace(trimSpace, '').split(splitSpace),
              o = [];
            for (var i = 0; i < coords.length; i++) {
              o.push(coord1(coords[i]));
            }
            return o;
          }

          // ########
          // var geoJson = [{
          //   type: 'Feature',
          //   "geometry": { "type": "Point", "coordinates": [114.033028, -21.847727]},
          //   "properties": {
          //     "marker-color": "#ff8888",
          //     "title": "Turtle Town",
          //     "url": "https://en.wikipedia.org/wiki/Chicago"
          //   }
          // }, {
          //   type: 'Feature',
          //   "geometry": { "type": "Point", "coordinates": [114.091414, -21.810967]},
          //   "properties": {
          //     "title": "Flipped Turtle",
          //     "url": "https://en.wikipedia.org/wiki/Chicago",
          //     "marker-color": "#7ec0ee"
          //   }
          // }, {
          //   type: 'Feature',
          //   "geometry": { "type": "Point", "coordinates": [1, 1]},
          //   "properties": {
          //     "title": "Flipped Turtle",
          //     "url": "https://en.wikipedia.org/wiki/Chicago",
          //     "marker-color": "#7ec0ee"
          //   }
          // }];

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
          }, {
            type: 'Feature',
            "geometry": { "type": "Point", "coordinates": [1, 1]},
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

              var popupContent = '<a target="_blank" class="popup" href="' + feature.properties.url + '">' + feature.properties.title + '</a>' + '<p>' + feature.geometry.coordinates + '</p>'; //'<img src="' + feature.properties.image + '" />' +

              // http://leafletjs.com/reference.html#popup
              marker.bindPopup(popupContent,{
                closeButton: false,
                minWidth: 100,
                keepInView: true,
              });
            });

        // ADDS DATA TO MAP
        myLayer.setGeoJSON(points_array);
        // myLayer.setGeoJSON(points_array2); //LIVE DATA ARRAY FEEDING FROM TASKS COLLECTION (***WILL NOT DISPLAY IF 'points_array' is being used first)


        // MARKER LIST ISSUE

        var markerList = document.getElementById('marker-list');

        map.featureLayer.on('ready', function(e) {
          map.featureLayer.eachLayer(function(layer) {
            var item = markerList.appendChild(document.createElement('li'));
            item.innerHTML = layer.toGeoJSON().properties.title;
            item.onclick = function() {
             map.setView(layer.getLatLng(), 14);
             layer.openPopup();
            };
          });
        });

        // END

      } else {
        console.log(error)
      }
    })
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

// Sort by turtle species button selection
// Template.speciesbutton.helpers({
  // species: function(e) {
    // return TurtleLogs.find({},findSpecies)
  // }
  // findSpecies: function(field, species){
  //   var o = {};
  //   o[field] =

  // }
// });

// Template.speciesbutton.events({
//   "click #speciesSelect" : function(e){
//     var what = $('input[name="species"]:checked', '#speciesSelect').val();
//     console.log(what);
//    // Session.set("findSpecies", select)
//   }
// });
