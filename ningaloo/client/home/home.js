Template.home.events({
  'click #homelogin': function(event){
    event.preventDefault();

      new Confirmation({
        message: "",
        title: "Welcome Alvin!",
        cancelText: "LOGOUT",
        okText: "GO",
        success: true
      }, function (ok) {
          {
          }
        });
            Router.go('/form');
   }
});

Template.home.events({
  'click #adminlogin': function(event){
    event.preventDefault();

      new Confirmation({
        message: "",
        title: "ADMIN CONSOLE",
        cancelText: "BACK",
        okText: "CONSOLE",
        success: true
      }, function (ok) {
        if(ok) {
            
          }
        });
            Router.go('/desktop');
   }
});