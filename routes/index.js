var data = require('../data.json');

exports.view = function(request, response){
	data.stringify = JSON.stringify(data);
	response.render('index', {'locations':data});
};