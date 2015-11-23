Template.datalog.turtlelogs = function() {
  return TurtleLogs.find({}, {limit:100}); 
}

Template.datalog.events({
  "click .clickable-row":function(e){
    console.log(this);
    e.preventDefault();
    console.log(e.currentTarget);
    Router.go("/itempage/"+this._id)
  }
});

