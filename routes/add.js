var data = require("../data.json");

exports.addMarker = function(request, response) { 
  var newMarker = {
    "address" : request.query.address,
    "person" : request.query.person,
    "date" : request.query.date,
    "noteContent" : request.query.noteContent
  };
  data.friends.push(newMarker);
	response.render('index', data);
 }
