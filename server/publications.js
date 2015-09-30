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