Meteor.subscribe('areas');

Template.areas.helpers({
  areas: function () {
    return Areas.find();
  },
  selectedAreaDoc: function () {
    return Areas.findOne(Session.get("selectedAreaId"));
  },
  isSelectedArea: function () {
    return Session.equals("selectedAreaId", this._id);
  },
  formType: function () {
    if (Session.get("selectedAreaId")) {
      return "update";
    } else {
      return "insert";
    }
  },
    classes: function(){
	  var temp = [];
	  var count = 0;
	  for(var Class in Classes.find().fetch()){
		  temp[count] = Class.name;
		  count++;
	  }
	  return temp;
  }
});

Template.areas.events({
  'click .area-row': function () {
    Session.set("selectedAreaId", this._id);
  }
});