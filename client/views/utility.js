Template.registerHelper('formatDate', function(date) {
  return moment(date).format('YYYY-MM-DD');
});

Template.registerHelper('transferStatus', function(status) {
  if(status == 'toClean') {
    return '待清洗';
  } else if(status == 'cleaning') {
    return '清洗中';
  } else if(status == 'returnedToStore') {
    return '已送回店中';
  } else {
    return '已完结';
  }

});
