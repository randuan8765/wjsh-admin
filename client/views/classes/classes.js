Meteor.subscribe('classes');

Template.classes.helpers({
  classes: function () {
    return Classes.find();
  }
});
