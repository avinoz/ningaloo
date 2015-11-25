Template.takePhoto.events({
  'click #capture': function(){

    var cameraOptions = {
      width: 800,
      height: 600
    };

    MeteorCamera.getPicture(cameraOptions, function(error, data) {
      if(!error){
  		  Session.set('photo', data);
      }else{
        console.log(error);
      }
		});
  }
});

Template.takePhoto.helpers({
  'photo': function(){
    return Session.get('photo')
  }
});
