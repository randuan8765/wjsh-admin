Meteor.subscribe('classes');

Template.classes.helpers({
  classes: function () {
    return Classes.find();
  },
  selectedClassDoc: function () {
    return Classes.findOne(Session.get("selectedClassId"));
  },
  isSelectedClass: function () {
    return Session.equals("selectedClassId", this._id);
  },
  formType: function () {
    if (Session.get("selectedClassId")) {
      return "update";
    } else {
      return "insert";
    }
  }
});

Template.classes.events({
  'click .class-row': function () {
    Session.set("selectedClassId", this._id);
  }
});
