Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function(){
  this.route('home', {path: '/'});
  this.route('form', {path: '/form'});
  this.route('list', {path: '/list'});
  this.route('map', {path: '/map'});
  // this.route('itempage',{path:'/itempage/id=:_id'} );
});
Router.route('/itempage/:_id', function () {
  var item = Tasks.findOne({_id: this.params._id});
  this.render('itempage', {data: item});
})