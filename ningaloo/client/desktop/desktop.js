
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
      listItemSelected:function(e){
        return Session.get("listItemSelected")
      }
});
Template.desktop.events({
  "click #marker-list li":function(thing){
    console.log(thing);
  }
});
Template.indiview.helpers({
  info:function(){
    console.log("Trying to load data");
    return TurtleLogs.findOne(Session.get("listItemSelected"))
  }//,
});
Template.desktop.onRendered(function () {
  console.log("Desktop rendered.");
  Mapbox.debug = true;
  Mapbox.load({
    plugins: ['Leaflet']
  });
  this.autorun(function(e){
    console.log(Template.currentData());
    console.log("This.autorun RUNNING");
    /////////////////////////////////////
    meteorCall();
  });
});

function meteorCall(){
  var map,myLayer;
  if (Mapbox.loaded()) {
  ///////////////////////////////////////
      Meteor.call('getMapBoxKey', function(error, result){
        if (!error) {
          if(!myLayer){
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
                  "nest_ID":obj.nest_ID,
                  "species":obj.species,
                  "url":"/itempage/"+obj.nest_ID,
                  "section":obj.section,
                  "subsection":obj.subsection,
                  "division":obj.division
                }
              }
              try{
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
            item.innerHTML = layer.toGeoJSON().features[0].properties.subsection+":"+layer.toGeoJSON().features[0].properties.species;
            item.onclick = function(e) {
              e.preventDefault();
              // item.dataset.id=layer.toGeoJSON().features[0].properties.nest_id;
              console.log(layer.toGeoJSON().features[0].properties.nest_ID);
              Session.set("listItemSelected",layer.toGeoJSON().features[0].properties.nest_ID);
              map.panTo(reverse(layer.toGeoJSON().features[0].geometry.coordinates));
              layer.openPopup();
            };
          });
        } else {console.log(error);}
      });
  }
}
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