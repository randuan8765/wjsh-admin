Meteor.subscribe('areas');

Template.areas.helpers({
  areas: function () {
    return Areas.find();
  }
});