var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};

TurtleSearch = new SearchSource('turtlelogs', ['division','species','section','subsection','notes'], options);

Template.searchResult.helpers({
  getTurtles: function() {
    return TurtleSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>");
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