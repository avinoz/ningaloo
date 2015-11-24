Meteor.subscribe("turtlelogs");
Template.fix.helpers({
  logs:function(){
    // TurtleLogs.update(this._id,{
    //   $set:{date:new Date(this.date)}
    // });
    return TurtleLogs.find().fetch();
  }
});