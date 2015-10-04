Meteor.subscribe('areas');

Template.areas.helpers({
  areas: function () {
    return Areas.find();
  },
  selectedAreaDoc: function () {
    return Areas.findOne(Session.get("selectedAreaId"));
  },
  isSelectedArea: function () {
    return Session.equals("selectedAreaId", this._id);
  },
  formType: function () {
    if (Session.get("selectedAreaId")) {
      return "update";
    } else {
      return "insert";
    }
  }
});

Template.areas.events({
  'click .area-row': function () {
    Session.set("selectedAreaId", this._id);
  }
});

Template.areaBusinesses.helpers({
  areaBusinesses: function () {
    return AreaBusinesses.find();
  },
  area: function () {
    var area = Areas.find({_id: Router.current().params._id});
    return area.fetch()[0];
  },
  areaId: function () {
    return Router.current().params._id;
  },
  selectedAreaBusinessDoc: function () {
    return AreaBusinesses.findOne(Session.get("selectedAreaBusinessId"));
  },
  isSelectedAreaBusiness: function () {
    return Session.equals("selectedAreaBusinessId", this._id);
  },
  formType: function () {
    if (Session.get("selectedAreaBusinessId")) {
      return "update";
    } else {
      return "insert";
    }
  },
});

Template.areaBusinesses.events({
  'click .area-row': function () {
    Session.set("selectedAreaBusinessId", this._id);
  },
  'change [name=factoryId]': function(event, template) {
    Session.set("selectedFactorySelector", event.currentTarget.value);
  }
});
