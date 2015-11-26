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
        title: "ADMIN ACCESS ONLY",
        cancelText: "Cancel",
        okText: "CONSOLE",
        success: true
      }, function (ok) {
          if (ok){
            // TurtleLogs.insert(turtlelog)
            Router.go('/form');
          }
        });
   }
});