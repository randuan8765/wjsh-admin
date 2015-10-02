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
  }
});

Template.stores.events({
  'click .store-row': function () {
    Session.set("selectedStoreId", this._id);
  },
  'submit #insertStoreForm': function(event){
	  event.preventDefault();
	  var username = event.target.creator.value
	  var userId = Meteor.users.findOne({username:username})._id
	  Meteor.users.update({_id: userId}, {$set:{'profile.storeId':this._id}});
  }
});