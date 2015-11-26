// Packages = new Mongo.Collection('packages');

// if(Meteor.isServer) {
//   Packages._ensureIndex({packageName: 1, description: 1});
// }
// TurtleLogs

TurtleLogs = new Mongo.Collection('turtlelogs');

if(Meteor.isServer) {
  TurtleLogs._ensureIndex({"nest_ID": 1, "division": 1, "section": 1, "subsection": 1, "species": 1});
}

