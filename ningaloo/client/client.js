Template.registerHelper('fromNow', function(date) {
  if (date)
    return moment(date).fromNow(true);
});