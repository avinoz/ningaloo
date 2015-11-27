
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

Router.route('/itempage/:_id',{
  subscriptions:function(){
    console.log("Trying to subscribe!@");
    return Meteor.subscribe("turtlelog",parseInt(this.params._id));
  },
  action:function () {
    if (this.ready()) {
      this.render('itempage');
    } else {
      // console.log(this);
      // this.render('home');
    }
  },data:function(){
    var find;
    if(typeof this.params._id "string"){
       find={_id:this.params._id};
    }else{
      find={_id:parseInt(this.params._id)};
    }
    console.log(find)
    return TurtleLogs.findOne(find);
  }

});