Template.list.helpers({
    tasks: function (e) {
            // Show newest tasks at the top
      console.log(this);
      console.log(e);
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

Template.task.events({
  "click a.item":function(e){
    console.log(this);
    e.preventDefault();
    console.log(e.currentTarget);
    Router.go("/itempage/"+this._id)
  }
});

Template.registerHelper('fromNow', function(date) {
  if (date)
    return moment(date).fromNow(true);
});