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
    Meteor.users.update({username: username}, {$set: {'profile.storeId': storeId}});
  },
  'Users.unsetStoreId': function (username) {
    Meteor.users.update({username: username}, {$unset: {'profile.storeId': ""}});
  },
});
