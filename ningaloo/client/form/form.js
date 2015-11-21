

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


  Template.form.events({
    'submit form': function(event){
      event.preventDefault();
      var field1 = $( "#form_select1 option:selected" ).text();
      var field2 = $( "#form_select2 option:selected" ).text();
      var field3 = $( "#form_select3 option:selected" ).text();
      var field4 = $( "#form_select4 option:selected" ).text();
      console.log("Form submitted");
      console.log(event.type);
      // var formSubmit = event.target.formSubmit;
      console.log(field1, field2, field3, field4);

      

      var turtlelog = {division: field1}
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
