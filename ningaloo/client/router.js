
Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function(){
  this.route('home', {path: '/'});
  this.route('form', {path: '/form'});
  this.route('list', {path: '/list'});
  this.route('map', {path: '/map'});
  this.route('desktop', {path: '/desktop'});
  this.route('test', {path: '/test'});
  this.route('datalog', {path: '/datalog'});
});

Router.route('/itempage/:_id', function () {
  this.render('itempage', {
    data: function () {
      var id = parseInt(this.params._id);
      var find = {nest_ID: id};
      console.log(find);
      var result = TurtleLogs.findOne(find);
      console.log(result);
      return result;
    }
  });
});