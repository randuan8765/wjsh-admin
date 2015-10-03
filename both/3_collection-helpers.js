// Define collection helpers in this file
synFunction = function(userId,storeName) {
    var _id = Stores.findOne({name:storeName})._id;
	Meteor.users.update({_id: userId}, {$set:{'profile.storeId':_id}});
	Session.set("storeId", _id);
};

afterInsertStoreClassFormSubmit = function(className) {
	var storeId = Session.get("storeId");
	var classId = StoreClasses.findOne({name:className,storeId:storeId})._id;
	Session.set("classId", classId);
};