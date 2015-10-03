var Collections = {};

Meteor.isClient && Template.registerHelper("Collections", Collections);

Classes = new Mongo.Collection("classes");
Classes.attachSchema(Schemas.Classes);

Classes.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});



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

Areas = new Mongo.Collection("areas");
Areas.attachSchema(Schemas.Areas);

Areas.allow({
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

StoreClasses = new Mongo.Collection("storeClasses");

//StoreClasses.before.insert(function (userId, doc) {
//  doc.createdAt = new Date();
//});

StoreClasses.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "分类名称",
  },
  storeId: {
    type: String,
    autoValue: function () {
      if (this.isSet) {
        return;
      }
      if (this.isInsert) {
        return Session.get("storeId");
      } else {
        this.unset();
      }
    }
  }
}));

StoreClasses.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

StoreBusinesses = new Mongo.Collection("storeBusinesses");

//StoreBusinesses.before.insert(function (userId, doc) {
//  doc.createdAt = new Date();
//});

StoreBusinesses.attachSchema(new SimpleSchema({
  name: {
    type: String,
	autoform: {
      type: "select-radio-inline",
      options: function () {
        var options = [];
		if(Session.get("AreaId") !== undefined){
			Areas.findOne({key:Session.get("AreaId")}).businesses.forEach(function (element){
			options.push({
				label: element.class, value: element.class
			}
			)
		}
		)
		}	
		return options
      }
    },
    label: "业务名称",
  },
  storeId: {
    type: String,
    autoValue: function () {
      if (this.isSet) {
        return;
      }
      if (this.isInsert) {
        return Session.get("storeId");
      } else {
        this.unset();
      }
    }
  },
  classId: {
    type: String,
    autoValue: function () {
      if (this.isSet) {
        return;
      }
      if (this.isInsert) {
        return Session.get("classId");
      } else {
        this.unset();
      }
    }
  }
}));

StoreBusinesses.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

People = Collections.People = new Mongo.Collection("People");
People.attachSchema(Schemas.Person);

Items = Collections.Items = new Mongo.Collection("Items");
Items.attachSchema(Schemas.Item);

PeopleWithContacts = Collections.PeopleWithContacts = new Mongo.Collection("PeopleWithContacts");
PeopleWithContacts.attachSchema(Schemas.PersonWithContacts);
