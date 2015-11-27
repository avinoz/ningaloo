
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

Meteor.subscribe('divisions');

// FORMATS OBJECTS TO SEND TO DB VIA LIST
Template.form.helpers({
  'changePhoto':function(){

  }
});
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
    var latfield5 = parseFloat(field5);
    var lonfield6 = parseFloat(field6);

    var regexlat = field5.replace("^\d+(?:\.\d+|)$")
    var regexlon = field6.replace("^\d+(?:\.\d+|)$")

    var image_id="No Image";
    var turtletext;
    var turtlelog
    var thing = Session.get("photo");
    try{
      Images.insert(thing, function (err, fileObj) {
        if(err){
          console.log(err);
        }else if(fileObj){
          console.log("File saved!");
          console.log(fileObj);
          image_id = fileObj._id;
          turtlelog = {
            date : new Date(),
            img_id: image_id,
            division: field1,
            section: field2,
            subsection: field3,
            species: field4,
            notes: field7,
            loc: {
              coordinates:[field6, field5],
              type: "Point"
              }
          };
          // var turtletext = JSON.stringify(turtlelog, null, 2)
         turtletext =  "<p> Latitude  " + field5 + "<br> Longitude " + field6 + "</p>" + turtlelog.division + "<br>" + turtlelog.section + "<br>" + turtlelog.subsection + "<br>" + turtlelog.species + "<p></p>" + turtlelog.notes;
          }
          new Confirmation({
            message: turtletext,
            title: "Confirmation",
            cancelText: "Cancel",
            okText: "Confirm",
            success: true
          }, function (ok) {
                  if (ok){
                    TurtleLogs.insert(turtlelog)
                    Router.go('/list');
                  }
          });
      });
    }catch(err){
      turtlelog = {
            date : new Date(),
            // img_id: image_id,
            division: field1,
            section: field2,
            subsection: field3,
            species: field4,
            notes: field7,
            loc: {
              coordinates:[field6, field5],
              type: "Point"
              }
          }
      turtletext =  "<p> Latitude  " + field5 + "<br> Longitude " + field6 + "</p>" + turtlelog.division + "<br>" + turtlelog.section + "<br>" + turtlelog.subsection + "<br>" + turtlelog.species + "<p></p>" + turtlelog.notes;
      new Confirmation({
          message: turtletext,
          title: "Confirmation",
          cancelText: "Cancel",
          okText: "Confirm",
          success: true
      }, function (ok) {
              if (ok){
                TurtleLogs.insert(turtlelog)
                Router.go('/list');
              }
      });
      console.log("No image...");
    }
},//submit form callback close
 // PORTS DATA FROM BELOW TO OPTION SELECT
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
},
"load #photo":function(e){
  console.log(e.target)
  var style = $('textarea').attr( "style" );
   $('textarea').attr( "style", "background: url(" + $('#photo').attr("src") + ")center;"+style );
 }

});


/// DYNAMIC DATA SORTING LOGIC


Template.form_s1.helpers({
  divisions: function(){
    return divisions;//Divisions.find().fetch();
  }
});
Template.form_s2_all.helpers({
  allSections:function(){
    return Sections.find().fetch();
  }
});
Template.form_s2_all.events({
  "change form_s2":function(){

  }
});
Template.form_s2.helpers({
 sections: function(div_name){

  return getStaticSections(div_name);
},
divisionSelected:getDiv
});

Template.form_s3.helpers({
  subsections:
  function(div_id,sec_name){
    return getStaticSubsections(div_id,sec_name);
    // console.log(div_id)
    // console.log(Divisions.find({name:div_id}).fetch());
    // var sections = Divisions.find({name:div_id}).fetch()[0].sections;
    // for(var section in sections){
    //   console.log("The section is = "+section);
    //   console.log("or = "+sections[section]);
    //   if(sections[section].name===sec_name){
    //     return sections[section].subsections;
    //   }
    // }
    // return;
  },
  divisionSelected:getDiv,
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
function getStaticSections(name){
  for(var division in divisions){
    if(divisions[division].name===name){
      return divisions[division].sections;
    }
  }
}
function getStaticSubsections(div_name,sect_name){
  for(var division in divisions){
    if(divisions[division].name===div_name)
      var sections = divisions[division].sections;
      for(var section in sections){
        if(sections[section].name===sect_name){
          return sections[section].subsections;
        }
      }
  }
}