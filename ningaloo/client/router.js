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
  this.route('desktop', {path: '/desktop'});
});

// Router.map(function() {
//   if (Meteor.isCordova) {
//     this.route('home', {path: '/'});
//     this.route('form', {path: '/form'});
//     this.route('list', {path: '/list'});
//     this.route('map', {path: '/map'});
//   }

//   if (Meteor.isClient) {
//     this.route('desktop', {path:'/desktop'});
//   }
// }