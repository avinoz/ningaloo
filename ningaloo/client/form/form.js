

if (Meteor.isClient) {
  if(Session.get("section")){
    Session.set("section",undefined);
    delete Session.keys.section;
  }
  if(Session.get("subsection")){
    Session.set("subsection",undefined);
    delete Session.keys.subsection;
  }
  if(Session.get("division")){
    Session.set("division",undefined);
    delete Session.keys.division;
  }

  // Template.addPlayerForm.events({
  //   'submit form': function(event){
  //     event.preventDefault();
  //     console.log("Form submitted");
  //     console.log(event.type);
  //     var playerNameVar = event.target.playerName.value;
  //     console.log(playerNameVar);
  //   }
  // });

// ( "#test option:selected" ).text();

// ########## TESTING THE MAP CALL
  // Template.map.helpers({
  //   geolocationError: function() {
  //     var error = Geolocation.error();
  //     return error && error.message;
  //   },
  //   mapOptions: function() {
  //     let latLng = Geolocation.latLng();
    
  //     var pulse1 = JSON.stringify(latLng.lat)
  //     var pulse2 = JSON.stringify(latLng.lng)
  //     console.log(pulse1, pulse2)

  //     console.log(latLng)
  //     // Initialize the map once we have the latLng.
  //     if (GoogleMaps.loaded() && latLng) {
  //       return {
  //         center: new google.maps.LatLng(latLng.lat, latLng.lng),
  //         zoom: MAP_ZOOM
  //       };
  //     }
  //   }
  // });

  // Template.map.events({
  //   'submit form': function(event){
  //     event.preventDefault();
  //     console.log(pulse) 
  //        $('.map_append').append(pulse1)

  //   }
  // });



// ###############




  Template.form.events({
    'submit form': function(event){
      event.preventDefault();
      var field1 = $( "#form_select1 option:selected" ).text();
      var field2 = $( "#form_select2 option:selected" ).text();
      var field3 = $( "#form_select3 option:selected" ).text();
      var field4 = $( "#form_select4 option:selected" ).text();
      var field5 = $( '#lat' ).text();
      var field6 = $( '#lon' ).text();
      console.log("Form submitted");
      console.log(event.type);
      console.log(field1, field2, field3, field4);

      $('.form_append1').append(field1)
      $('.form_append2').append(field2)
      $('.form_append3').append(field3)
      $('.form_append4').append(field4)


      // ### CREATES K/V OBJECT 
      var turtlelog = {division: field1, section: field2, subsection: field3, turtleSpecies: field4, latLng:{lat:field5,lon:field6}}
      console.log(turtlelog)



    },
    "change #form_select1":function(e){
      var division = $( "#form_select1 option:selected" ).text();
      Session.set("division",division)
    },
    "change #form_select2":function(e){
      var section = $( "#form_select2 option:selected" ).text();
      Session.set("section",section)
    },
    "change #form_select3":function(e){
      var subsection = $( "#form_select3 option:selected" ).text();
      Session.set("subsection",subsection)
    }
  });


/// DATA TEMP

  Template.form_s1.helpers({
    divisions: [{name: "Cape Range"}, {name: "Coral Bay"}, {name: "North West Cape"}]
  });


  Template.form_s2.helpers({
   sections: [{name: "Batemans Bay"}, {name: "Bungelup"}, {name: "Graveyards"}, {name: "Hunters"}, {name: "Lighthouse Bay"}, {name: "Ningaloo"}, {name: "Tandabiddi"}],
   divisionSelected:function(){
      console.log("divisionSelected firing");
      return Session.get("division");
    }
  });

  Template.form_s3.helpers({
    subsections: [{name: "Batemans Bay"}, {name: "Boat Harbor"}, {name: "Brooke-Graveyards"}, {name: "Bundera"}, {name: "Bungleup Beach"}, {name: "Burrows-Jurabi Point"}, {name: "Five Mile North-Five Mile Carpark"}, {name: "Graveyards Burrows"}, {name: "Hunters-Mauritius"}, {name: "Jacobz South-Wobiri"}, {name: "Janes Bay South"}, {name: "Mauritius-Jacobz South"}, {name: "Mildura Wreck-North West Carpark"}, {name: "Neils Beach"}, {name: "North West Carpark-Surf Beach"}, {name: "Rolly Beach"}, {name: "Surf Beach-Hunters"}, {name: "Trisel-Five Mile Carpark"}],
    sectionSelected:function(){
      console.log("sectionSelected firing");
      return Session.get("section");
    }
  });

  Template.form_s4.helpers({
    turtleSpecies: [{name:"Green"}, {name:"Hawksbill"}, {name:"Loggerhead"}, {name:"Unidentified"}],
    subsectionSelected:function(){
      console.log("subsectionSelected firing");
      return Session.get("subsection");
    }
  });

}
