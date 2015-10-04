Router.configure({
  notFoundTemplate: 'not_found', //to learn
  loadingTemplate: 'loading',
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'home'});
Router.route('/classes', {name: 'classes'});
Router.route('/employees', {name: 'employees'});
Router.route('/factories', {name: 'factories'});
Router.route('/factories/:_id', {
  name: 'factory.businesses',
  waitOn: function () {
    console.log('router');
    return Meteor.subscribe("factoryBusinesses", this.params._id);
  },
  data: function() {
    return Factories.findOne({_id: this.params._id});
  }
});

Router.route('/areas', {name: 'areas'});
Router.route('/areas/:_id', {
  name: 'area.businesses',
  waitOn: function () {
    return Meteor.subscribe("areaBusinesses", this.params._id);
  },
  data: function() {
    return Areas.findOne({_id: this.params._id});
    // return Factories.findOne({_id: this.params._id});
  }
});

Router.route('/stores', {name: 'stores'});
Router.route('/stores/:_id', {
  name: 'store.businesses',
  subscriptions: function () {
    var array = [];
    array.push(Meteor.subscribe("storeClasses", this.params._id));
    array.push(Meteor.subscribe("storeClassBusinesses", this.params._id));
    return array;
  },
  action: function() {
    if (this.ready()) {
      this.render();
    } else {
      this.render('Loading');
    }
  },
  data: function() {
    return Stores.findOne({_id: this.params._id});
  }
});
