Meteor.startup(function(e){

  console.log("Divisions is empty? "+Divisions.find().count===0);
  if(Divisions.find().count()===0){
    var divisions = [
      {
        name:"Cape Range",
        sections:[
          {
            name:"Bungelup",
            subsections:[{
              name:"Bungelup Beach"
            },{
              name:"Neils Beach"
            },{
              name:"Rolly Beach"
            }]
          }
        ]
      },
      {
        name:"Northwest Cape",
        sections:[
          {name:"Graveyards",
          subsections:[
              {name:"Brooke - Graveyards"},
              {name:"Five Mile North - Five Mile Carpark"},
              {name:"Graveyards - Burrows"},
              {name:"Trisel - Five Mile Carpark"}]
          },
          {name:"Hunters",
          subsections:[
              {name:"Hunters - Mauritius"},
              {name:"Jacobz South - Wobiri"},
              {name:"Mauritius - Jacobz South"}]
          },
          {name:"Lighthouse Bay",
          subsections:[
              {name:"Mildura Wreck - North West Carpark"},
              {name:"North West Carpark - Surf Beach"},
              {name:"Surf Beach - Hunters"}]
          },
          {name:"Tandabiddi",
          subsections:[{name:"Burrows - Jurabi Point"}]
          }]
      }
    ]
    for(var division in divisions){
      Divisions.insert(divisions[division])
    }
  }else{
    var divs = Divisions.find().fetch();
    console.log(divs);
  }
  ///////////////////////////
  Meteor.methods({
    'getMapBoxKey': function() {
      return Meteor.settings.mapBoxKey
    }
  });
  ///////////////////////////
  Meteor.publish('divisions',function(){
    return Divisions.find({});
  });
  ///////////////////////////
  Meteor.publish("turtlelogs", function(){
    return TurtleLogs.find({})
  });
  Meteor.publish("images", function(){
    return Images.find({})
  });
});