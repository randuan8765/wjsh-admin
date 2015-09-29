Router.configure({
  notFoundTemplate: 'not_found', //to learn
  loadingTemplate: 'loading',
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'home'});
Router.route('/classes', {name: 'classes'});
Router.route('/employees', {name: 'employees'});
Router.route('/factories', {name: 'factories'});
Router.route('/areas', {name: 'areas'});
Router.route('/stores', {name: 'stores'});

Router.route('/update-each', {
  name: 'update-each',
  waitOn: function () {
    return Meteor.subscribe("allItems");
  }
});
Router.route('/updatepush', {
  name: 'updatepush'
});
Router.route('/update-array-item', {
  name: 'updateArrayItem'
});
