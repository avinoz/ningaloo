
Mapbox.load();
Template.desktop.helpers({
    turtlelogs: function (e) {  //change in list.html
      return TurtleLogs.find({}, {sort: {date: -1}});
      }
});
Template.desktop.onRendered(function () {
  console.log("Desktop rendered.");
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
          var points_array = []
          var my_layers = [];
          var markerList = document.getElementById('marker-list');
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
            my_layers.push(L.mapbox.featureLayer(geoJson).addTo(myLayer));
            // console.log(myLayer);
              // points_array.push(geoJson);
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
        var markerList = document.getElementById('marker-list');
        console.log(myLayer);
        // myLayer.on('ready', function(e) {
          myLayer.eachLayer(function(layer) {
            console.log(layer.toGeoJSON())
            var item = markerList.appendChild(document.createElement('li'));
            console.log(layer.toGeoJSON().features[0].geometry.coordinates)
            item.onclick = function(e) {
              e.preventDefault();
             map.panTo(reverse(layer.toGeoJSON().features[0].geometry.coordinates));
             layer.openPopup();
            };
          });
      } else {
        console.log(error)
      }
    })
    }
  });
});
function panUpLeft(arr){
  var ble=[]
  for(var i=0;i<arr.length;i++){
    console.log(arr[i]);
    ble.push(arr[i]+10);
  }
  console.log(ble)
  return ble;
}
function reverse(arr){

  return [arr[1],arr[0]];
}