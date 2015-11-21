Template.list.helpers({
    tasks: function () {
            // Show newest tasks at the top
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.list.events({
    "submit .new-task": function(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a task into the collection
      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";
    }
  });