
Mapbox.load();


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
          TurtleLogs.find({}, {limit:10} ).forEach(function(obj, idx, arr){
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


Meteor.subscribe("turtlelogs");
Template.desktop.helpers({
    turtlelogs: function (e) {  //change in list.html
      return TurtleLogs.find({}, {limit:10});
    }
    // sortLogs:function(field,order){ //change in list.html
    //   var orderString = order>0?"asc":"desc";
    //   var o = {}
    //   o[field]=order;
    //   var sort = {sort:o};
    //   return TurtleLogs.find({},sort);

    // },
    // sortingBy:function(){
    //   return Session.get("sortingBy");
    // },
    // sortOrder:function(){
    //   return Session.get("sortOrder")||1;
    // }
  });
// Template.sortingFields.events({
//   "change #sortingSelect":function(e){
//     var sortingBy = $( "#sortingSelect option:selected" ).text();
//     if(sortingBy.length==0){
//       Session.set("sortingBy",undefined);
//     }else{
//       Session.set("sortingBy",sortingBy);
//     }
//   },
//   "click #sortOrder":function(){
//       if(Session.get("sortOrder")){
//         Session.set("sortOrder",-Session.get("sortOrder"));
//       }else{
//         Session.set("sortOrder",-1)
//       }
//     }
// });
// Session.set("sortingBy","date");
// Template.sortingFields.helpers({
//   fields:[
//     {fieldName:"date"},
//     {fieldName:"division"},
//     {fieldName:"section"},
//     {fieldName:"subsection"},
//     {fieldName:"species"}

//   ]
// });



Template.desktop.events({
  "click #turtle-list":function (e) {
    e.preventDefault();
    this.$(".toggle-row").toggle();
    console.log(e.target.href);
    Router.go('/itempage/'+this._id);
  }
});

Template.desktop.onRendered(function () {
  $('.turtle-list').hover(function () {
    $('.turtle-row').toggle(100);
  })
});


Template.desktop.turtlelogs = function () {
  var result = HTTP.call("GET", '/itempage/'+this._id)
  return Session.get('result');
};


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

Template.speciesbutton.events({
  "click #speciesSelect" : function(e){
    var what = $('input[name="species"]:checked', '#speciesSelect').val();
    console.log(what);
   // Session.set("findSpecies", select)
  }
});
