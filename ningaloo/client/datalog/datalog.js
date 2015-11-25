Template.datalog.helpers({
	turtlelogs:function(t) {
  	return TurtleLogs.find({}, {limit:100});
	}
})

Template.datalog.events({
  "click .clickable-row":function(e){
    console.log(this);
    e.preventDefault();
    console.log(e.currentTarget);
    Router.go("/itempage/"+this._id)
  }
});

console.log("hello from datalog.js");

Meteor.subscribe("turtlelogs")