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
	  var username = event.target.creator.value;
	  userId = Meteor.users.findOne({username:username})._id;
	  storeName = event.target.name.value;
	  
	  var AreaId = event.currentTarget.area.value;
	  Session.set("AreaId", AreaId);
	  synFunction(userId,storeName);
  },
  'submit #insertStoreClassForm': function(event){
	  var className = event.target.name.value;
	  afterInsertStoreClassFormSubmit(className);
  }
});