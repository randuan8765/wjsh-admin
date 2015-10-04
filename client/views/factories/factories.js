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

Template.factoryBusinesses.helpers({
  factoryBusinesses: function () {
    return FactoryBusinesses.find();
  },
  factory: function () {
    var factory = Factories.find({_id: Router.current().params._id});
    return factory.fetch()[0];
  },
  factoryId: function () {
    return Router.current().params._id;
  },
  selectedFactoryBusinessDoc: function () {
    return FactoryBusinesses.findOne(Session.get("selectedFactoryBusinessId"));
  },
  isSelectedFactoryBusiness: function () {
    return Session.equals("selectedFactoryBusinessId", this._id);
  },
  formType: function () {
    if (Session.get("selectedFactoryBusinessId")) {
      return "update";
    } else {
      return "insert";
    }
  },
});

Template.factoryBusinesses.events({
  'click .factory-row': function () {
    Session.set("selectedFactoryBusinessId", this._id);
  }
});
