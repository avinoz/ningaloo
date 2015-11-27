
Mapbox.load();
Template.desktop.events({
  "click #marker-list li":function(){
    //TODO click marker item and load itempage info.
  }
});
Template.desktop.helpers({
    turtlelogs: function (e) {  //change in list.html
      return TurtleLogs.find({}, {sort: {date: -1}});
      },
    regetTurtles:getTurtles
});
var _dep = new Deps.Dependency();
console.log(_dep);
function fuzzy(){
  console.log("fuzzy TRIGGERED")
  _dep.changed();
  return Session.get("fuzzy");
}
Template.desktop.onRendered(function (context) {
  Mapbox.debug = true;
  Mapbox.load({
    plugins: ['Leaflet']
  });
  this.autorun(function (e) {
    _dep.depend();
    console.log(Template.currentData());
    console.log("This.autorun RUNNING");
    var map,Lmapbox,myLayer;
  if (Mapbox.loaded()) {
    // return (function(){
      Meteor.call('getMapBoxKey', function(error, result){
        if (!error) {
          if(!myLayer){
            // Lmapbox = L.mapbox;
            L.mapbox.accessToken = result;
            map = L.mapbox.map('map', 'avinoz.o7nj93k2');
            map.setView([-21.854578, 114.103581], 12, {pan: {animate: true, duration: 2}, zoom: {animate: true}})
            myLayer = L.mapbox.featureLayer().addTo(map);
          }
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
          console.log("Hello from populate");
          // TurtleLogs.find({}).forEach(function(obj, idx, arr){
            var results;
          if(Session.get("fuzzy")){
            results=Template.searchResult.__helpers[" getTurtles"]();
            Session.set("fuzzy",undefined)
          }else{
            results=TurtleLogs.find({});
          }
          results.forEach(function(obj, idx, arr){
            if(obj.loc.coordinates.length!==0){
              var geoJson = {
                type:'Feature',
                "geometry":{
                  "type":"Point",
                  "coordinates":obj.loc.coordinates
                },
                "properties":{
                  "marker-color": statusColor(obj),
                  "title":obj.species,
                  "url":"/itempage/"+obj.nest_ID,
                  "section":obj.section,
                  "subsection":obj.subsection,
                  "division":obj.division
                }
              }
              try{
                // console.log(geoJson);
                // console.log(L);
                // console.log(L.mapbox);
                // console.log(myLayer);
                L.mapbox.featureLayer(geoJson).addTo(myLayer);
              }catch(err){
                console.log(err,obj);
              }
            }
          });
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
          myLayer.eachLayer(function(layer) {
            // console.log(layer.toGeoJSON())
            var item = markerList.appendChild(document.createElement('li'));
            // console.log(layer.toGeoJSON().properties)
            item.innerHTML = layer.toGeoJSON().features[0].properties.subsection;
            item.onclick = function(e) {
              e.preventDefault();
              map.panTo(reverse(layer.toGeoJSON().features[0].geometry.coordinates));
              layer.openPopup();
            };
          });
        } else {
          console.log(error)
        }
      });
  }else{
    console.log(error)
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
function getTurtles(){
  console.log("getTurtles RUNNING");
  return
}
function populate(){
  console.log("populate RUNNING");
  var map,Lmapbox,myLayer;
  if (Mapbox.loaded()) {
    // return (function(){
      Meteor.call('getMapBoxKey', function(error, result){
        if (!error) {
          // if(!myLayer){
            // Lmapbox = L.mapbox;
            L.mapbox.accessToken = result;
            map = L.mapbox.map('map', 'avinoz.o7nj93k2');
            map.setView([-21.854578, 114.103581], 12, {pan: {animate: true, duration: 2}, zoom: {animate: true}})
            myLayer = L.mapbox.featureLayer().addTo(map);
          // }
          console.log(myLayer);
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
          console.log("Hello from populate");
          // TurtleLogs.find({}).forEach(function(obj, idx, arr){
          Template.searchResult.__helpers[" getTurtles"]().forEach(function(obj, idx, arr){
            if(obj.loc.coordinates.length!==0){
              var geoJson = {
                type:'Feature',
                "geometry":{
                  "type":"Point",
                  "coordinates":obj.loc.coordinates
                },
                "properties":{
                  "marker-color": statusColor(obj),
                  "title":obj.species,
                  "url":"/itempage/"+obj.nest_ID,
                  "section":obj.section,
                  "subsection":obj.subsection,
                  "division":obj.division
                }
              }
              try{
                console.log(geoJson);
                console.log(L);
                console.log(L.mapbox);
                console.log(myLayer);
                L.mapbox.featureLayer(geoJson).addTo(myLayer);
              }catch(err){
                console.log(err,obj);
              }
            }
          });
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
          myLayer.eachLayer(function(layer) {
            // console.log(layer.toGeoJSON())
            var item = markerList.appendChild(document.createElement('li'));
            // console.log(layer.toGeoJSON().properties)
            item.innerHTML = layer.toGeoJSON().features[0].properties.subsection;
            item.onclick = function(e) {
              e.preventDefault();
              map.panTo(reverse(layer.toGeoJSON().features[0].geometry.coordinates));
              layer.openPopup();
            };
          });
        } else {
          console.log(error)
        }
      });
  }else{
    console.log(error)
  }
}