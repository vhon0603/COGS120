var data = require("../data.json");

exports.view = function(req, res) {
  var newName = req.params.userName;
  console.log("name: " + newName);
  res.render('index', {
    'name': newName,
  });
};

exports.addMarker = function(request, response) { 
  /*var newMarker = {
    "address" : request.query.address,
    "person" : request.query.person,
    "date" : request.query.date,
    "noteContent" : request.query.noteContent
  };*/
  //data.markers.push(newMarker);
	response.render('index', data);
 }
