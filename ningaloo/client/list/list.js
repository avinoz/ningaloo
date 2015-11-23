console.log("Hello from list.js");
Meteor.subscribe("tasks");
Template.list.helpers({
    tasks: function (e) {
      return Tasks.find({}, {sort: {createdAt: -1}});
    },
    sortTasks:function(field,order){
      if(field==="date"){
        return Tasks.find({},{sort:{createdAt:order}});
      }else{
        var orderString = order>0?"asc":"desc";
        var o = {}
        o['turtlelog.'+field]=order;
        var sort = {sort:o};
        return Tasks.find({},sort);
      }
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
    {fieldName:"turtleSpecies"}

  ]
});