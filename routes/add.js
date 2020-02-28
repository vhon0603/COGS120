var data = require("../data.json");

exports.view = function(req, res) {
  var newName = req.params.userName;
  console.log("name: " + newName);
  res.render('index', {
    'name': newName,
    'viewAlt': false
  });
};

exports.viewAlt = function(req, res) {
  var newName = req.params.userName;
  console.log("name: " + newName);
  res.render('index', {
    'name': newName,
    'viewAlt': true
  });
};
