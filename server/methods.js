Meteor.methods({
  'Users.insertStoreId': function (username, storeId) {
    // if (!Meteor.user()) {
    //   return;
    // }
    //
    // if (_(Meteor.user().profile.votedProductIds).include(_id)) {
    //   return;
    // }
    //
    // Products.update({_id: _id}, {$inc: {numberOfVotes: 1}, $addToSet: {voterIds: this.userId}});
    // Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.votedProductIds': _id}});

    Meteor.users.update({username: username}, {$set: {'profile.storeId': storeId}});
  },
  'Users.updateStoreId': function (username, storeId) {
    // if (!Meteor.user()) {
    //   return;
    // }
    //
    // if (_(Meteor.user().profile.votedProductIds).include(_id)) {
    //   return;
    // }
    //
    // Products.update({_id: _id}, {$inc: {numberOfVotes: 1}, $addToSet: {voterIds: this.userId}});
    // Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.votedProductIds': _id}});
    var account = Meteor.users.find({'profile.storeId': storeId}).fetch();
    // if(account.length > 0) //should remove the old account ,but we will implement it after testing
    // Meteor.users.update({'profile.storeId': username}, {$set: {'profile.storeId': storeId}});
    Meteor.users.update({username: username}, {$set: {'profile.storeId': storeId}});
  }
});
