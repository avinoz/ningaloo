TurtleLogs = new Mongo.Collection('turtlelogs');

if(Meteor.isServer) {
  TurtleLogs._ensureIndex({"nest_ID": 1, "division": 1, "section": 1, "subsection": 1, "species": 1});
}

