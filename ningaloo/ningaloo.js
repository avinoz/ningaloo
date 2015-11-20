if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  // Template.submitForm.events({
  //   'submit form#data_form' : function(e, tmpl) {
  //   // 'change form#data_form' : function(e, tmpl) {
  //     e.preventDefault();
  //     var selectedOption = tmpl.find('.form-control :selected');

  //     var insertData = {
  //       field: (selectedOption && selectedOption.text)
  //     }
  //   }
  // });

  Template.form_section1.helpers({
    divisions: [{name: "Cape Range"}, {name: "Coral Bay"}, {name: "North West Cape"}]
    });

  Template.form_section2.helpers({
    sections: [{name: "Batemans Bay"}, {name: "Bungelup"}, {name: "Graveyards"}, {name: "Hunters"}, {name: "Lighthouse Bay"}, {name: "Ningaloo"}, {name: "Tandabiddi"}]
    });

  Template.form_section3.helpers({
    subsections: [{name: "Batemans Bay"}, {name: "Boat Harbor"}, {name: "Brooke-Graveyards"}, {name: "Bundera"}, {name: "Bungleup Beach"}, {name: "Burrows-Jurabi Point"}, {name: "Five Mile North-Five Mile Carpark"}, {name: "Graveyards Burrows"}, {name: "Hunters-Mauritius"}, {name: "Jacobz South-Wobiri"}, {name: "Janes Bay South"}, {name: "Mauritius-Jacobz South"}, {name: "Mildura Wreck-North West Carpark"}, {name: "Neils Beach"}, {name: "North West Carpark-Surf Beach"}, {name: "Rolly Beach"}, {name: "Surf Beach-Hunters"}, {name: "Trisel-Five Mile Carpark"}]
    });

  Template.form_section4.helpers({
    turtleSpecies: [{name:"Green"}, {name:"Hawksbill"}, {name:"Loggerhead"}, {name:"Unidentified"}]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


