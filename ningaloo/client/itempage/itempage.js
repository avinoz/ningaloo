Template.imageView.helpers({
});
Template.imageView.helpers({
  images: function () {
    return Images.find(); // Where Images is an FS.Collection instance
  },
  getImage:function(id){
    var result = Images.find(id);
    return result;
  }
});