Meteor.subscribe('stores');

Template.stores.helpers({
  stores: function () {
    return Stores.find();
  }
});