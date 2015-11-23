Mapbox.load();

// Template.desktop.onRendered(function () {
//   $('#map.mapbox').css("width", "50%")
//   $('#map.mapbox').css("top", "0px")
//   $('#map.mapbox').css("height", "100vh")
//   $('#map.mapbox').css("z-index", "0")
// });

Template.desktop.onRendered(function () {
  L.mapbox.accessToken = 'pk.eyJ1IjoiYXZpbm96IiwiYSI6ImNpaDlwdGNqMTB1NXJ2MGtpZ201ajFjeTMifQ.Ez4-ox27mzPcc8Fq4B3VUA';
  var map = L.mapbox.map('map', 'avinoz.o7nj93k2');
  map.setView([-21.854578, 114.103581], 12, {pan: {animate: true, duration: 2}, zoom: {animate: true}})

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
});