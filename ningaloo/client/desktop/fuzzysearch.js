// var options = {
//   keepHistory: 1000 * 60 * 5,
//   localSearch: true
// };
// var fields = ['packageName', 'description'];

// PackageSearch = new SearchSource('packages', fields, options);

// Template.searchResult.helpers({
//   getPackages: function() {
//     return PackageSearch.getData({
//       transform: function(matchText, regExp) {
//         return matchText.replace(regExp, "<b>$&</b>")
//       },
//       sort: {isoScore: -1}
//     });
//   },
  
//   isLoading: function() {
//     return PackageSearch.getStatus().loading;
//   }
// });

// Template.searchResult.rendered = function() {
//   PackageSearch.search('');
// };

// Template.searchBox.events({
//   "keyup #search-box": _.throttle(function(e) {
//     var text = $(e.target).val().trim();
//     PackageSearch.search(text);
//   }, 200)
// });

// Turtle Logs
var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
// var fields = ['division', 'section', 'subsection', 'species', 'nest_ID'];

TurtleSearch = new SearchSource('turtlelogs', ['division'], options);

Template.searchResult.helpers({
  getTurtles: function() {
    return TurtleSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>")
        console.log('Y U NO WERK');
      },
      sort: {isoScore: -1}
    });
  },
  
  isLoading: function() {
    return TurtleSearch.getStatus().loading;
  }
});

Template.searchResult.rendered = function() {
  TurtleSearch.search('');
    console.log('what the hell');
};

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    console.log("hello from searchbox")
    var text = $(e.target).val().trim();
    TurtleSearch.search(text);
  }, 200)
});