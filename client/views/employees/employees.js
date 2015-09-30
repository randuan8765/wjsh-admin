Meteor.subscribe('employees');

Template.employees.helpers({
  employees: function () {
    return Employees.find();
  }
});