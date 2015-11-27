Meteor.subscribe("images");
Meteor.subscribe("turtlelog");
Template.imageView.helpers({
  images: function () {
    return Images.find(); // Where Images is an FS.Collection instance
  },
  getImage:function(id){
    console.log("Trying to find image...");
    var result = Images.find(id);
    return result;
  }
});