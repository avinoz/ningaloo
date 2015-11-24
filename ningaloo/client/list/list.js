console.log("Hello from list.js");
Meteor.subscribe("turtlelogs");
Template.list.helpers({
    turtlelogs: function (e) {  //change in list.html
      return TurtleLogs.find({}, {sort: {createdAt: -1}});
    },
    sortLogs:function(field,order){ //change in list.html
      var orderString = order>0?"asc":"desc";
      var o = {}
      o[field]=order;
      var sort = {sort:o};
      return TurtleLogs.find({},sort);

    },
    sortingBy:function(){
      return Session.get("sortingBy");
    },
    sortOrder:function(){
      return Session.get("sortOrder")||1;
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
      if(Session.get("sortOrder")){
        Session.set("sortOrder",-Session.get("sortOrder"));
      }else{
        Session.set("sortOrder",-1)
      }
    }
});
Session.set("sortingBy","date");
Template.sortingFields.helpers({
  fields:[
    {fieldName:"date"},
    {fieldName:"division"},
    {fieldName:"section"},
    {fieldName:"subsection"},
    {fieldName:"species"}

  ]
});