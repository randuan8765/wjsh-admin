Meteor.subscribe('factories');

Template.factories.helpers({
  factories: function () {
    return Factories.find();
  },
  selectedFactoryDoc: function () {
    return Factories.findOne(Session.get("selectedFactoryId"));
  },
  isSelectedFactory: function () {
    return Session.equals("selectedFactoryId", this._id);
  },
  formType: function () {
    if (Session.get("selectedFactoryId")) {
      return "update";
    } else {
      return "insert";
    }
  }

});

Template.factories.events({
  'click .factory-row': function () {
    Session.set("selectedFactoryId", this._id);
  }
});