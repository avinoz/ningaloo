// var turtlelogsDump = Assets.getText('packages.dump').split('\n').filter(function(p) {
//   return !!p;
// });

// if(Packages.find().count() < packagesDump.length) {
//   console.log("adding initial set of packages (%s)", packagesDump.length);
//   for(var lc=0; lc<packagesDump.length; lc++) {
//     if(lc > 0 && lc % 500 == 0) {
//       console.log("  added packages: ", lc);
//     }
//     var p = packagesDump[lc];
//     p = EJSON.parse(p);
//     SavePackage(p.packageName, p);
//   };
//   console.log("completed!");
// }

// TurtleLogs
// Seeds the turtle logs into the DB collection "turtlelogs" 500 at a time
var turtlelogDump = Assets.getText('turtlelogs.dump').split('\n').filter(function(p) {
  return !!p;
});

if(TurtleLogs.find().count() < turtlelogDump.length) {
  console.log("adding initial set of turtlelogs (%s)", turtlelogDump.length);
  for(var lc=0; lc<turtlelogDump.length; lc++) {
    if(lc > 0 && lc % 500 == 0) {
      console.log("  added turtlelogs: ", lc);
    }
    var p = turtlelogDump[lc];
    p = EJSON.parse(p);
    SavePackage(p.nest_ID, p);
  };
  console.log("completed!");
}