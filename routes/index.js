var data = require('../data.json');

exports.view = function(request, response){
	data.stringify = JSON.stringify(data);

	var name = request.query.name;
	if (name === undefined) {
		name = "";
	}
	response.render('index', {
		'locations':data,
		'username': name
	});
};