console.log("Hello from router.js");
Router.configure({
  // if($(window).height() < 1400){
    layoutTemplate: 'layout'
    // console.log($(window))
  // } else {
  //   layoutTemplate'desktop'
  // }
});

Router.map(function(){
  this.route('home', {path: '/'});
  this.route('form', {path: '/form'});
  this.route('list', {path: '/list'});
  this.route('map', {path: '/map'});
});
Router.route('/itempage/:_id', function () {
  var item = Tasks.findOne({_id: this.params._id});
  this.render('itempage', {data: item});
});