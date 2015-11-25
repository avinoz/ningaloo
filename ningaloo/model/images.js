Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images")]
});
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