Meteor.subscribe('factories');

Template.factories.helpers({
  factories: function () {
    return Factories.find();
  }
});