// // require('dotenv').load();
// // L.mapbox.accessToken = process.env.MAPBOX_TOKEN


// // L.mapbox.accessToken = 'pk.eyJ1IjoiYXZpbm96IiwiYSI6ImNpZnVvcmV1YzIzcWx1cGtxZ2Z5cWlrMTYifQ.VB-HMZg5gUGTydcXDGvgOw';
// // Create a map in the div #map
// // var map = L.mapbox.map('map', 'avinoz.o11688nh');


// // #################
// // ## MARKER LIST ##
// // #################

// var markerList = document.getElementById('marker-list');
// var location_list = []; /// AVIO

// map.featureLayer.on('ready', function(e) {
//   map.featureLayer.eachLayer(function(layer) {
//     var item = markerList.appendChild(document.createElement('li'));

//     var title = layer.toGeoJSON().properties.title
//     var link = $('<a>').attr('href', "#" + title.replace(" ", "_"))[0];
//     link.innerHTML = title;
//     $(item).append(link);
//     location_list.push(item.innerHTML); // AVIO

//     // item.onClick = function(e) {
//     $(item).click(function(e) {

//       e.preventDefault();
//       var selected_title = title.replace(" ", "_")
//       var curr_a = $('a[name='+selected_title+']').children('img')
//       var next_pos = curr_a.position().top
//       // console.log(curr_a)
//       // console.log(next_pos)

//       var curr_location = $("#image_container").scrollTop()
//       console.log(curr_location)
//       $("#image_container").animate({scrollTop: next_pos+curr_location-125,});

//       map.setView(layer.getLatLng(), 16);
//       layer.openPopup();
//     });
//   });
// });


// // #################
// // ## GEOLOCATION ##
// // #################

// var myLayer = L.mapbox.featureLayer().addTo(map);

// if (!navigator.geolocation) {
//     geolocate.innerHTML = 'Geolocation is not available';
// } else {
//     geolocate.onclick = function (e) {
//         e.preventDefault();
//         e.stopPropagation();
//         map.locate();
//     };
// }

// // Once we've got a position, zoom and center the map
// // on it, and add a single marker.
// map.on('locationfound', function(e) {
//   map.fitBounds(e.bounds);

//   myLayer.setGeoJSON({
//     type: 'Feature',
//     geometry: {
//         type: 'Point',
//         coordinates: [e.latlng.lng, e.latlng.lat]
//     },
//     properties: {
//         'title': 'Found you!',
//         'marker-color': '#FFA500',
//         // 'marker-symbol': 'star'
//     }
//   });

//     // And hide the geolocation button
//   geolocate.parentNode.removeChild(geolocate);
// });

// // If the user chooses not to allow their location
// // to be shared, display an error message.
// map.on('locationerror', function() {
//     geolocate.innerHTML = 'Position could not be found';
// });

// // ######################
// // ## MOVE TO LOCATION ##
// // ######################


// $('#address_input_form').submit(function(e){
//   e.preventDefault();
//   var goToLoc = $('#address_input').val()
//   var preGeo = "https://maps.googleapis.com/maps/api/geocode/json?address="+
//   goToLoc.replace(" ", "+")+"&key=AIzaSyA-wgAoFVNAXobauBdLlaLedu6evnU8OVw"
//   console.log(preGeo)

//   $.ajax({
//     url: preGeo,
//     method: 'GET'
//   }).done(function(msg){
//     test = msg
//   console.log(test)

//   var lat = test.results[0].geometry.location.lat
//   var lng = test.results[0].geometry.location.lng
//   console.log(lat)
//   console.log(lng)
//   map.setView([lat, lng], 16);
//   });
// });



// // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyA-wgAoFVNAXobauBdLlaLedu6evnU8OVw

// // test = {
// //    "results" : [
// //       {
// //          "address_components" : [
// //             {
// //                "long_name" : "1600",
// //                "short_name" : "1600",
// //                "types" : [ "street_number" ]
// //             },
// //             {
// //                "long_name" : "Amphitheatre Parkway",
// //                "short_name" : "Amphitheatre Pkwy",
// //                "types" : [ "route" ]
// //             },
// //             {
// //                "long_name" : "Mountain View",
// //                "short_name" : "Mountain View",
// //                "types" : [ "locality", "political" ]
// //             },
// //             {
// //                "long_name" : "Santa Clara County",
// //                "short_name" : "Santa Clara County",
// //                "types" : [ "administrative_area_level_2", "political" ]
// //             },
// //             {
// //                "long_name" : "California",
// //                "short_name" : "CA",
// //                "types" : [ "administrative_area_level_1", "political" ]
// //             },
// //             {
// //                "long_name" : "United States",
// //                "short_name" : "US",
// //                "types" : [ "country", "political" ]
// //             },
// //             {
// //                "long_name" : "94043",
// //                "short_name" : "94043",
// //                "types" : [ "postal_code" ]
// //             }
// //          ],
// //          "formatted_address" : "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
// //          "geometry" : {
// //             "location" : {
// //                "lat" : 37.4220352,
// //                "lng" : -122.0841244
// //             },
// //             "location_type" : "ROOFTOP",
// //             "viewport" : {
// //                "northeast" : {
// //                   "lat" : 37.42338418029149,
// //                   "lng" : -122.0827754197085
// //                },
// //                "southwest" : {
// //                   "lat" : 37.4206862197085,
// //                   "lng" : -122.0854733802915
// //                }
// //             }
// //          },
// //          "place_id" : "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
// //          "types" : [ "street_address" ]
// //       }
// //    ],
// //    "status" : "OK"
// // }