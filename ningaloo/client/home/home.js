Template.home.events({
  'submit form': function(event){
    event.preventDefault();

      new Confirmation({
        message: "",
        title: "Login",
        cancelText: "Cancel",
        okText: "Confirm",
        success: true
      }, function (ok) {
          if (ok){
            // TurtleLogs.insert(turtlelog)
            Router.go('/form');
          }
        });
   }
});