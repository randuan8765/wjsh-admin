Meteor.subscribe('stores');
Meteor.subscribe('users');

Template.stores.helpers({
  stores: function () {
    return Stores.find();
  },
  selectedStoreDoc: function () {
    return Stores.findOne(Session.get("selectedStoreId"));
  },
  isSelectedStore: function () {
    return Session.equals("selectedStoreId", this._id);
  },
  formType: function () {
    if (Session.get("selectedStoreId")) {
      return "update";
    } else {
      return "insert";
    }
  },
  isInsert: function () {
    if (Session.get("selectedStoreId")) {
      return false;
    } else {
      return true;
    }
  }
});

Template.stores.events({
  'click .store-row': function () {
    Session.set("selectedStoreId", this._id);
  },
  'click .form-to-insert': function() {
    Session.set('selectedStoreId', undefined);
  },
});

Template.storeBusinesses.helpers({
  storeClasses: function () {
    return StoreClasses.find();
  },
  store: function () {
    var store = Stores.find({_id: Router.current().params._id});
    return store.fetch()[0];
  },
  storeId: function () {
    return Router.current().params._id;
  },
  storeClassId: function () {
    return Session.get("selectedStoreClassId");
  },
  storeClassBusinesses: function () {
    return StoreBusinesses.find({storeClassId: Session.get("selectedStoreClassId")});
  },
  selectedStoreClassDoc: function () {
    return StoreClasses.findOne(Session.get("selectedStoreClassId"));
  },
  isSelectedStoreClass: function () {
    return Session.equals("selectedStoreClassId", this._id);
  },
  selectedStoreClassBusinessDoc: function () {
    return StoreBusinesses.findOne(Session.get("selectedStoreClassBusinessId"));
  },
  isSelectedStoreBusinessClass: function () {
    return Session.equals("selectedStoreClassBusinessId", this._id);
  },
  formType: function () {
    if (Session.get("selectedStoreClassId")) {
      return "update";
    } else {
      return "insert";
    }
  },
  isInsert: function () {
    if (Session.get("selectedStoreClassId")) {
      return false;
    } else {
      return true;
    }
  },
  subformType: function () {
    if (Session.get("selectedStoreClassBusinessId")) {
      return "update";
    } else {
      return "insert";
    }
  },
  subisInsert: function () {
    if (Session.get("selectedStoreClassBusinessId")) {
      return false;
    } else {
      return true;
    }
  }
});

Template.storeBusinesses.events({
  'click .store-row': function () {
    Session.set("selectedStoreClassId", this._id);
  },
  'click .form-to-insert': function() {
    Session.set('selectedStoreClassId', undefined);
  },
  'click .store-row-sub': function () {
    Session.set("selectedStoreClassBusinessId", this._id);
  },
  'click .sub-form-to-insert': function() {
    Session.set('selectedStoreClassBusinessId', undefined);
  },
});
