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
  var preManager = Employees.findOne(doc.preManager.preManagerId);
  modifier.$set["preManager.preManagerName"] = preManager.name;
  modifier.$set["preManager.preManagerStaffId"] = preManager.staffId;
  modifier.$set["preManager.preManagerMobile"] = preManager.mobile;

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

Stores.before.insert(function (userId, doc) {
  doc.orderCount = 0;
});

Stores.after.insert(function (userId, doc) {
  Meteor.call('Users.insertStoreId', doc.creator, doc._id);
});

Stores.after.update(function (userId, doc, fieldNames, modifier, options) {
  Meteor.call('Users.unsetStoreId', this.previous.creator); //其实应该判断下改前和改后的值是否相等
  Meteor.call('Users.updateStoreId', doc.creator, doc._id);


});

StoreClasses = new Mongo.Collection("storeClasses");

StoreClasses.before.insert(function (userId, doc) {
  var storeClasses = StoreClasses.find({storeId: doc.storeId}).fetch();
  var colorSet = ['calm', 'balanced', 'energized', 'assertive', 'royal'];
  doc.color = colorSet[storeClasses.length];
 // doc.createdAt = new Date();
});

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

StoreBusinesses.before.insert(function (userId, doc) {
  if(!doc.areaBusinessIds) {
    return ;
  }
  doc.areaBusinesses = new Array();
  for(var i = 0; i < doc.areaBusinessIds.length; i ++) {
    var area = AreaBusinesses.findOne(doc.areaBusinessIds[i]);
    doc.areaBusinesses.push({"areaBusinessId": area._id, "areaBusinessName": area.name, "areaBusinessPrice": area.price});
  }
});

StoreBusinesses.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.areaBusinesses = new Array();
  for(var i = 0; i < modifier.$set.areaBusinessIds.length; i ++) {
    var area = AreaBusinesses.findOne(modifier.$set.areaBusinessIds[i]);
    modifier.$set.areaBusinesses.push({"areaBusinessId": area._id, "areaBusinessName": area.name, "areaBusinessPrice": area.price});
  }
});

Items = new Mongo.Collection("items");
Items.attachSchema(Schemas.Items);

Items.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});


Items.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  console.log(doc);
  console.log(modifier);

  if(modifier.$unset) {
    console.log('unset');
    return ;
  }
  if(modifier.$set['actualBusiness.areaBusinessId']) {
    var areaBusiness = AreaBusinesses.findOne(modifier.$set['actualBusiness.areaBusinessId']);
    modifier.$set['actualBusiness.areaBusinessName'] = areaBusiness.name;
    modifier.$set['actualBusiness.areaBusinessPrice'] = areaBusiness.price;

    modifier.$set['actualBusiness.factoryId'] = areaBusiness.factoryId;
    modifier.$set['actualBusiness.factoryBusinessId'] = areaBusiness.factoryBusinessId;

    if(doc.status == 'toClean') {
      console.log(doc.status);
      modifier.$set.status = 'cleaning';
    }
    return ;
  }

});
