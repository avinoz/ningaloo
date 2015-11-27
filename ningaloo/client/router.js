
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
  var find = {nest_ID:parseInt(this.params._id)};
  var item = TurtleLogs.findOne(find);
  console.log(item);
  this.render('itempage', {data: item});
});