// Define collection helpers in this file
synFunction = function(userId,storeName) {
    var _id = Stores.findOne({name:storeName})._id;
	Meteor.users.update({_id: userId}, {$set:{'profile.storeId':_id}});
};