Meteor.publish('classes', function() {
  return Classes.find();
});

Meteor.publish('employees', function() {
  return Employees.find();
});

Meteor.publish('factories', function() {
  return Factories.find();
});

Meteor.publish('areas', function() {
  return Areas.find();
});

Meteor.publish('stores', function() {
  return Stores.find();
});

Meteor.publish('users', function() {
  return Meteor.users.find();
});

Meteor.users.allow({
    update: function(userId, docs, fields, modifier) {
	return true;
	}
 });