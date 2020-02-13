var data = require("../data.json");

exports.getInfo = function(req, res) {
    res.json(data);
};