
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
  var find;
  try{
    find = {_id: new Meteor.Collection.ObjectID(this.params._id)}
  }catch(err){
    find = {_id: this.params._id};
  }
  var item = TurtleLogs.findOne(find);
  this.render('itempage', {data: item});
});