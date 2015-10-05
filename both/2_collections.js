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

Areas.before.insert(function (userId, doc) {
  var preManager = Employees.findOne(doc.preManager.preManagerId);
  doc.preManager.preManagerName = preManager.name;
  doc.preManager.preManagerStaffId = preManager.staffId;
  doc.preManager.preManagerMobile = preManager.mobile;

  var postManager = Employees.findOne(doc.postManager.postManagerId);
  doc.postManager.postManagerName = postManager.name;
  doc.postManager.postManagerStaffId = postManager.staffId;
  doc.postManager.postManagerMobile = postManager.mobile;
});

Areas.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  console.log("modifier.$set");
  console.log(modifier);
  var preManager = Employees.findOne(doc.preManager.preManagerId);
  modifier.$set["preManager.preManagerName"] = preManager.name;
  modifier.$set["preManager.preManagerStaffId"] = preManager.staffId;
  modifier.$set["preManager.preManagerMobile"] = preManager.mobile;
  console.log("modifier.$set  after");
  console.log(modifier.$set);

  var postManager = Employees.findOne(doc.postManager.postManagerId);
  modifier.$set["postManager.postManagerName"] = postManager.name;
  modifier.$set["postManager.postManagerStaffId"] = postManager.staffId;
  modifier.$set["postManager.postManagerMobile"] = postManager.mobile;
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

StoreBusinesses = new Mongo.Collection("storeBusinesses");

//StoreClasses.before.insert(function (userId, doc) {
//  doc.createdAt = new Date();
//});

StoreBusinesses.attachSchema(Schemas.StoreBusinesses);

StoreBusinesses.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
