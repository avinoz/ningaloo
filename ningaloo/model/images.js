// var imageStore = new FS.Store.GridFS("images");
// Images = new FS.Collection("images", {
//   stores: [imageStore]
// });
Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images")]
});
// FS.debug=true;
Images.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 },
 download: function(){
 return false;
 }
 });

Images.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});