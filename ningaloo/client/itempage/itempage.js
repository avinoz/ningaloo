Meteor.subscribe("images");
Template.imageView.helpers({
  images: function () {
    return Images.find(); // Where Images is an FS.Collection instance
  },
  getImage:function(id){
    console.log("count "+Images.find(id).count());
    var result = Images.find(id);
    return result;
  }
});