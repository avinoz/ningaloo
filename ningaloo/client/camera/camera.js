Template.takePhoto.events({
  'click .capture': function(){
    MeteorCamera.getPicture({}, function(error, data) {
      if(!error){
  		  Session.set('photo', data);
      }else{
        console.log(error);
      }
		});
  	// console.log("Button clicked.");
    // console.log(error);
  }
});

Template.takePhoto.helpers({
  'photo': function(){
    return Session.get('photo')
  }
});
