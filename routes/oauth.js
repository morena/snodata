function getService(serviceName){
	//let's read the param
	try {
		var service = require('./' + serviceName);
		return service;
	} catch (e) {
		res.end("error:"+ e);
	}
}

exports.login = function(req, res) {
	var service = getService(req.params.service);
	service.login(req,res);
}

exports.callback = function(req, res){
	var service = getService(req.params.service);
	service.callback(req,res);
}