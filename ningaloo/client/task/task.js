console.log("Hello from task.js");
Template.task.events({
  "click a.item":function(e){
    console.log(this);
    e.preventDefault();
    console.log(e.currentTarget);
    Router.go("/itempage/"+this._id)
  }
});