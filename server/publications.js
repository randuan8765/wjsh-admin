Meteor.publish('classes', function() {
  return Classes.find();
});

Meteor.publish('employees', function() {
  return Employees.find();
});

Meteor.publish('factories', function() {
  return Factories.find();
});

Meteor.publish('factoryBusinesses', function(factoryId) {
  if(factoryId) {
    return FactoryBusinesses.find({factoryId: factoryId});
  } else {
    return FactoryBusinesses.find();
  }
});

Meteor.publish('areas', function() {
  return Areas.find();
});

Meteor.publish('areaBusinesses', function(areaId) {
  if(areaId) {
    return AreaBusinesses.find({areaId: areaId});
  } else {
    return AreaBusinesses.find();
  }
});

Meteor.publish('stores', function() {
  return Stores.find();
});

Meteor.publish('storeClasses', function(storeId) {
  if(storeId) {
    return StoreClasses.find({storeId: storeId});
  } else {
    return StoreClasses.find();
  }
});

Meteor.publish('storeClassBusinesses', function(storeId) {
  if(storeId) {
    return StoreClassBusinesses.find({storeId: storeId});
  } else {
    return StoreClassBusinesses.find();
  }
});

Meteor.publish('users', function() {
  return Meteor.users.find();
});

Meteor.users.allow({
    update: function(userId, docs, fields, modifier) {
	return true;
	}
 });
