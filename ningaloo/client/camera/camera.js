Template.takePhoto.events({
  'click .capture': function(){

    // var cameraOptions = {
    //   width: 800,
    //   height: 600,
    //   sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    // };

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