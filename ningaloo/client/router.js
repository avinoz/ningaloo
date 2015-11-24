
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
  var item = TurtleLogs.findOne({_id: this.params._id});
  this.render('itempage', {data: item});
});