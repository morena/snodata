exports.getPositions = function(req,res){
	//let's read the param
	try {
		var service = require('./' + req.params.service);
		service.getPositions(req,res);
	} catch (e) {
		res.end("error:"+ e);
	}
}