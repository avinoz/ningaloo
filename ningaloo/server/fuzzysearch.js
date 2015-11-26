// SearchSource.defineSource('packages', function(searchText, options) {
//   var options = {sort: {isoScore: -1}, limit: 20};
  
//   if(searchText) {
//     var regExp = buildRegExp(searchText);
//     var selector = {$or: [
//       {packageName: regExp},
//       {description: regExp}
//     ]};

//     return Packages.find(selector, options).fetch();
//   } else {
//     return Packages.find({}, options).fetch();
//   }
// });

// function buildRegExp(searchText) {
//   // this is a dumb implementation
//   var parts = searchText.trim().split(/[ \-\:]+/);
//   return new RegExp("(" + parts.join('|') + ")", "ig");
// }

// Turtle Logs
SearchSource.defineSource('turtlelogs', function(searchText, options) {
  var options = {sort: {isoScore: -1}, limit: 20};
  
  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [
      {nest_ID: regExp},
      {division: regExp},
      {section: regExp},
      {subsection: regExp},
      {date: regExp},
      {species: regExp}
    ]
  };

    return TurtleLogs.find(selector, options).fetch();
  } else {
    return TurtleLogs.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}