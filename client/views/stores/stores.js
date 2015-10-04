Meteor.subscribe('stores');
Meteor.subscribe('users');
var userId;
var storeName;

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
  }
});

Template.stores.events({
  'click .store-row': function () {
    Session.set("selectedStoreId", this._id);
  },
  'submit #insertStoreForm': function(event){
	  //event.preventDefault();
	  var username = event.currentTarget.creator.value;
	  userId = Meteor.users.findOne({username:username})._id;

  },
  // 'submit #insertStoreClassForm': function(event){
	//   var className = event.target.name.value;
	//   afterInsertStoreClassFormSubmit(className);
  // }
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
  selectedStoreClassDoc: function () {
    return StoreClasses.findOne(Session.get("selectedStoreClassId"));
  },
  isSelectedStoreClass: function () {
    return Session.equals("selectedStoreClassId", this._id);
  },
  formType: function () {
    if (Session.get("selectedStoreClassId")) {
      return "update";
    } else {
      return "insert";
    }
  },
});

Template.storeBusinesses.events({
  'click .store-row': function () {
    Session.set("selectedStoreClassId", this._id);

  }
});
