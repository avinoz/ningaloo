Tasks = new Mongo.Collection("tasks");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("tasks", function () {
    return Tasks.find();
  });
}

if (Meteor.isClient) {

}

// if (Meteor.isCordova) {

// }