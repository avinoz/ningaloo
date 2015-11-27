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
     if(text.length==0){
      console.log(this);
      $("#search-result").animate({left: "-650px"}, 500)
     }else{
      $("#search-result").animate({left: "0"}, 500)
     }
    Session.set("fuzzy",text)
  }, 200),
  "blur #search-box":function(){
    $("#search-result").animate({left: "-650px"}, 500);
  }
});