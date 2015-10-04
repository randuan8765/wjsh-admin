var Collections = {};

Meteor.isClient && Template.registerHelper("Collections", Collections);

Employees = new Mongo.Collection("employees");
Employees.attachSchema(Schemas.Employees);

Employees.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Factories = new Mongo.Collection("factories");
Factories.attachSchema(Schemas.Factories);

Factories.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

AreaBusinesses = new Mongo.Collection("areaBusinesses");
AreaBusinesses.attachSchema(Schemas.AreaBusinesses);

AreaBusinesses.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Classes = new Mongo.Collection("classes");
Classes.attachSchema(Schemas.Classes);

Classes.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Areas = new Mongo.Collection("areas");
Areas.attachSchema(Schemas.Areas);

Areas.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

FactoryBusinesses = new Mongo.Collection("factoryBusinesses");
FactoryBusinesses.attachSchema(Schemas.FactoryBusinesses);

FactoryBusinesses.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});



Stores = new Mongo.Collection("stores");
Stores.attachSchema(Schemas.Stores);

Stores.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Stores.after.insert(function (userId, doc) {
  Meteor.call('Users.insertStoreId', doc.creator, doc._id);
});

Stores.after.update(function (userId, doc) {
  Meteor.call('Users.updateStoreId', doc.creator, doc._id);
});

StoreClasses = new Mongo.Collection("storeClasses");

//StoreClasses.before.insert(function (userId, doc) {
//  doc.createdAt = new Date();
//});

StoreClasses.attachSchema(Schemas.StoreClasses);

StoreClasses.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

StoreClassBusinesses = new Mongo.Collection("storeClassBusinesses");

//StoreClasses.before.insert(function (userId, doc) {
//  doc.createdAt = new Date();
//});

StoreClassBusinesses.attachSchema(Schemas.StoreClassBusinesses);

StoreClassBusinesses.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
