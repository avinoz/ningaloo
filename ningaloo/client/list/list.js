console.log("Hello from list.js");
Meteor.subscribe("turtlelogs");
Template.list.helpers({
    turtlelogs: function (e) {  //change in list.html
      return TurtleLogs.find({}, {sort: {date: -1}});
    },
    sortLogs:function(field,order){ //change in list.html
      var orderString = order>0?"asc":"desc";
      var o = {}
      o[field]=order;
      var sort = {sort:o,limit:25};
      console.log(sort);
      return TurtleLogs.find({},sort);

    },
    filterLogs:function(){
      if(Session.get("filteringBy"))
        return TurtleLogs.find({img_id:{'$exists':true}});
      else
        return TurtleLogs.find({});
    },
    sortingBy:function(){
      return Session.get("sortingBy");
    },
    sortOrder:function(){
      return Session.get("sortOrder")||1;
    },
    filterBy:function(){
      return Session.get("filteringBy");
    }
  });
Template.sortingFields.events({
  "change #sortingSelect":function(e){
    var sortingBy = $( "#sortingSelect option:selected" ).text();
    if(sortingBy.length==0){
      Session.set("sortingBy",undefined);
    }else{
      Session.set("sortingBy",sortingBy);
    }
  },
  "click #sortOrder":function(){
    console.log(Session.get("sortOrder"));
      if(Session.get("sortOrder")){
        Session.set("sortOrder",-Session.get("sortOrder"));
      }else{
        Session.set("sortOrder",-1)
      }
    },
    "click #hasImages":function(){
      if(Session.get("filteringBy")){
        Session.set("filteringBy",undefined);
      }else{
        Session.set("filteringBy","hasImages")
      }
    },
});
Session.set("sortingBy","date");
Session.set("filteringBy","hasImages")
Template.sortingFields.helpers({
  fields:[
    {fieldName:"date"},
    {fieldName:"division"},
    {fieldName:"section"},
    {fieldName:"subsection"},
    {fieldName:"species"}

  ]
});