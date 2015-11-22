Template.takePhoto.events({
  'click .capture': function(){
    MeteorCamera.getPicture({}, function(error, data){
		  Session.set('photo', data);
			});
  	// console.log("Button clicked.");
    console.log(error);
    }
});

Template.takePhoto.helpers({
  'photo': function(){
    return Session.get('photo')
  }
});