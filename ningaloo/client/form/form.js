
// CONVERTES MAP TO MOBILE VIEW
Template.map.onRendered(function () {
  $('#map.mapbox').css("width", "600px")
  $('#map.mapbox').css("top", "620px")
  $('#map.mapbox').css("height", "500px")
  $('#map.mapbox').css("z-index", "2")
});

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


// FORMATS OBJECTS TO SEND TO DB VIA LIST
Template.form.events({
  'submit form': function(event){
    event.preventDefault();
    var field1 = $( "#form_select1 option:selected" ).text();
    var field2 = $( "#form_select2 option:selected" ).text();
    var field3 = $( "#form_select3 option:selected" ).text();
    var field4 = $( "#form_select4 option:selected" ).text();
    var field5 = $( '#lat' ).text();
    var field6 = $( '#lon' ).text();
    var field7 = $('textarea').val();
    // var field8 =

    // CREATES K/V OBJECT
    // console.log(turtlelog)
    //ADDS OBJ TO DB
    var thing = document.getElementById("photo").src;
    var image_id="No Image";
    Images.insert(thing, function (err, fileObj) {
        if(err){
          console.log(err);
        }
        if(fileObj){
          console.log("File saved!");
          console.log(fileObj);
          image_id = fileObj._id;
          var turtlelog = {img_id:image_id,division: field1, section: field2, subsection: field3, turtleSpecies: field4, notes:field7,latLng:{lat:field5,lon:field6}};
          Tasks.insert({
            turtlelog: turtlelog,
            createdAt: new Date() // CURRENT TIME
          });
              Router.go('/list');

        }
      });

    Session.set("photo",undefined);
    // }
    // AFTER SUBMIT REDIRECT

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


/// DYNAMIC DATA SORTING

Template.form_s1.helpers({
  divisions: function(){
    return Divisions.find().fetch();
  }
});

Template.form_s2.helpers({
 sections: function(div_id){
  return Divisions.find({name:div_id}).fetch()[0].sections;
 },
 divisionSelected:getDiv
});

Template.form_s3.helpers({
  subsections: function(div_id,sec_name){
    console.log(div_id)
    console.log(Divisions.find({name:div_id}).fetch());
    var sections = Divisions.find({name:div_id}).fetch()[0].sections;
    for(var section in sections){
      console.log("The section is = "+section);
      console.log("or = "+sections[section]);
      if(sections[section].name===sec_name){
        return sections[section].subsections;
      }
    }
    return;
   },divisionSelected:getDiv,
  //[{name: "Batemans Bay"}, {name: "Boat Harbor"}, {name: "Brooke-Graveyards"}, {name: "Bundera"}, {name: "Bungleup Beach"}, {name: "Burrows-Jurabi Point"}, {name: "Five Mile North-Five Mile Carpark"}, {name: "Graveyards Burrows"}, {name: "Hunters-Mauritius"}, {name: "Jacobz South-Wobiri"}, {name: "Janes Bay South"}, {name: "Mauritius-Jacobz South"}, {name: "Mildura Wreck-North West Carpark"}, {name: "Neils Beach"}, {name: "North West Carpark-Surf Beach"}, {name: "Rolly Beach"}, {name: "Surf Beach-Hunters"}, {name: "Trisel-Five Mile Carpark"}],
  sectionSelected:getSec
});

Template.form_s4.helpers({
  turtleSpecies: [{name:"Green"}, {name:"Hawksbill"}, {name:"Loggerhead"}, {name:"Unidentified"}],
  subsectionSelected:function(){
    console.log("subsectionSelected firing");
    return Session.get("subsection");
  }
});
function getDiv(){
      console.log("divisionSelected firing");
      return Session.get("division");
}
function getSec(){
    console.log("sectionSelected firing");
    return Session.get("section");
}