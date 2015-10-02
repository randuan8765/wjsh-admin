Meteor.subscribe('employees');

Template.employees.helpers({
  employees: function () {
    return Employees.find();
  },
  selectedEmployeeDoc: function () {
    return Employees.findOne(Session.get("selectedEmployeeId"));
  },
  isSelectedEmployee: function () {
    return Session.equals("selectedEmployeeId", this._id);
  },
  formType: function () {
    if (Session.get("selectedEmployeeId")) {
      return "update";
    } else {
      return "insert";
    }
  },
  showRegisterForm:function(){
	  var choice = AutoForm.getFieldValue('type', 'insertEmployeeForm');
	  if(choice == "pre")
	  {
		  return true;
	  }else{
		  return false;
	  }
  }
});

Template.employees.events({
  'click .employee-row': function () {
    Session.set("selectedEmployeeId", this._id);
  }
});