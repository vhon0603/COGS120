var data = require("../data.json");
var fs = require('fs')

exports.getInfo = function(req, res) {
    res.json(data);
};

exports.addJSON = function(req, res) {
  console.log(req.body);
  var jsonData = JSON.stringify(req.body)
  fs.writeFile("data.json", jsonData, function (err){
    if (err){
      console.log(err);
    }
  });
  res.send(200)
};
