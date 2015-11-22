console.log("Hello from list.js");
Template.list.helpers({
    tasks: function (e) {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });